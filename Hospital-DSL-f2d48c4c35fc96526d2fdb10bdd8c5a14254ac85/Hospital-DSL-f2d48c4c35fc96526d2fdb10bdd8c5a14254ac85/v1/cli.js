#!/usr/env node
import fs from 'fs';
import path from 'path';
import { parseSchema, parseViews } from './src/ir/transformer.js';
import { SemanticAnalyzer } from './src/ir/analyzer.js';

const args = process.argv.slice(2);
const command = args[0];
const targetDir = args[1];

if (!targetDir) {
  console.log(`
Usage:
  node cli.js validate <project_folder_or_prefix>
  node cli.js generate <project_folder_or_prefix>

Example:
  node cli.js validate ../examples/sunflower-clinic
`);
  process.exit(1);
}

// Try to find .schema and .views
let schemaFile = targetDir.endsWith('.schema') ? targetDir : `${targetDir}.schema`;
let viewsFile = targetDir.endsWith('.schema') ? targetDir.replace('.schema', '.views') : `${targetDir}.views`;

if (!fs.existsSync(schemaFile)) {
  console.error(`❌ Could not find schema file: ${schemaFile}`);
  process.exit(1);
}

const schemaContent = fs.readFileSync(schemaFile, 'utf-8');
let viewsContent = null;
if (fs.existsSync(viewsFile)) {
  viewsContent = fs.readFileSync(viewsFile, 'utf-8');
}

if (command === 'validate' || command === 'generate') {
  try {
    console.log(`\n⏳ Parsing Schema...`);
    const schemaAST = parseSchema(schemaContent);

    let viewsAST = null;
    if (viewsContent) {
      console.log(`⏳ Parsing Views...`);
      viewsAST = parseViews(viewsContent);
    }

    console.log(`⏳ Running Semantic Analyzer...`);
    const analyzer = new SemanticAnalyzer(schemaAST, viewsAST);
    const result = analyzer.validate();

    if (!result.isValid) {
      console.error(`\n❌ Semantic Validation Failed! Found ${result.errors.length} errors:\n`);
      result.errors.forEach(err => console.error(`  - ${err}`));
      console.log('\n');
      process.exit(1);
    }

    console.log('\n✅ DSL is completely valid!\n');
    console.log(`Hospital : ${schemaAST.name}`);
    console.log(`Modules  : ${result.symbolTable.modules.size} (including M2M junctions)`);
    for (const [id, m] of result.symbolTable.modules.entries()) {
      console.log(`  • ${id} — ${m.fields.size} fields, ${m.apis.size} APIs`);
    }
    console.log(`\nRoles    : ${Array.from(result.symbolTable.roles.keys()).join(', ')}`);
    console.log(`Auth     : ${result.symbolTable.auth.type}, expires ${result.symbolTable.auth.expiry}`);

    if (viewsAST) {
      console.log(`\nUI Portals:`);
      for (const p of viewsAST.portals) {
        console.log(`  • ${p.name} (for ${p.roles.join(', ')}) — ${p.pages.length} pages`);
      }
    }

    if (command === 'generate') {
      const outputDir = args[2] || 'generated';
      
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🏥 Generating Full-Stack App for: ${schemaAST.name}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      
      // Backend
      await import('./src/codegen/backend/configGen.js').then(m => m.generateConfig(schemaAST, result.symbolTable, outputDir));
      await import('./src/codegen/backend/entityGen.js').then(m => m.generateEntities(schemaAST, result.symbolTable, outputDir));
      await import('./src/codegen/backend/repoGen.js').then(m => m.generateRepositories(schemaAST, result.symbolTable, outputDir));
      await import('./src/codegen/backend/serviceGen.js').then(m => m.generateServices(schemaAST, result.symbolTable, outputDir));
      await import('./src/codegen/backend/controllerGen.js').then(m => m.generateControllers(schemaAST, result.symbolTable, outputDir));
      await import('./src/codegen/backend/securityGen.js').then(m => m.generateSecurity(schemaAST, result.symbolTable, viewsAST, outputDir));

      // Frontend
      if (viewsAST) {
        await import('./src/codegen/frontend/scaffoldGen.js').then(m => m.generateScaffold(schemaAST, outputDir));
        await import('./src/codegen/frontend/apiServiceGen.js').then(m => m.generateApiService(schemaAST, result.symbolTable, outputDir));
        await import('./src/codegen/frontend/authGen.js').then(m => m.generateAuth(schemaAST, viewsAST, outputDir));
        await import('./src/codegen/frontend/layoutGen.js').then(m => m.generateLayouts(viewsAST, outputDir));
        await import('./src/codegen/frontend/containerGen.js').then(m => m.generateContainers(outputDir));
        await import('./src/codegen/frontend/pageGen.js').then(m => m.generatePages(viewsAST, schemaAST, result.symbolTable, outputDir));
        await import('./src/codegen/frontend/appGen.js').then(m => m.generateApp(viewsAST, outputDir));
      }

      console.log('\n✅ Generation complete!\n');
    }

  } catch (err) {
    console.error('\n❌ Compilation Error:', err.stack);
    process.exit(1);
  }
} else {
  console.log(`Unknown command: ${command}`);
}
