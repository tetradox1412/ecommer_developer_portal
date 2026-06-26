const fs = require('fs');
const { execSync } = require('child_process');

function createZip(moduleName, version, dslCode, displayName, industry, category, iconName, tagline, color) {
  const dir = `module_${moduleName}`;
  const modDir = `${dir}/module`;
  
  fs.mkdirSync(modDir, { recursive: true });

  const packageJson = {
    packageVersion: 1,
    moduleName: moduleName,
    version: version,
    createdAt: new Date().toISOString(),
    files: {
      schema: 'project.schema',
      views: 'project.views',
      manifest: 'module-manifest.xml',
      metadata: 'module-metadata.json'
    }
  };

  const metadataJson = {
    name: moduleName,
    displayName: displayName,
    version: version,
    description: tagline,
    longDescription: tagline + ' and much more.',
    contextPath: '/' + moduleName,
    category: category,
    industry: industry,
    iconName: iconName,
    tagline: tagline,
    color: color,
    features: ['Feature 1', 'Feature 2'],
    price: 0,
    changelog: 'Initial version',
    releaseNotes: 'Ready for use'
  };

  const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<module>
    <name>${moduleName}</name>
    <version>${version}</version>
    <description>${tagline}</description>
    <contextPath>/${moduleName}</contextPath>
</module>`;

  fs.writeFileSync(`${modDir}/package.json`, JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(`${modDir}/module-metadata.json`, JSON.stringify(metadataJson, null, 2));
  fs.writeFileSync(`${modDir}/module-manifest.xml`, manifestXml);
  fs.writeFileSync(`${modDir}/project.schema`, dslCode);
  fs.writeFileSync(`${modDir}/project.views`, '// No views defined');

  execSync(`cd ${dir} && zip -r ../${moduleName}-${version}.zip module`);
  execSync(`rm -rf ${dir}`);
}

createZip(
  'loyalty-points', '1.2.0',
  `module loyalty-points {\n  version "1.2.0"\n\n  // Register partner charge webhook\n  route POST "/charge" {\n    handler "stripe-charge"\n    role "DEVELOPER_PARTNER"\n    timeout 15s\n  }\n\n  entity PointLedger {\n    customerId: String;\n    points: Integer;\n  }\n}`,
  'Loyalty Rewards', 'retail', 'Customer Engagement', 'Star', 'Keep them coming back', 'amber'
);

createZip(
  'payment-gateway', '0.9.0',
  `module payment-gateway {\n  version "0.9.0"\n\n  route POST "/payments/charge" {\n    handler "process-charge"\n    role "MERCHANT"\n    timeout 30s\n  }\n\n  route POST "/payments/refund" {\n    handler "issue-refund"\n    role "MERCHANT"\n    timeout 30s\n  }\n\n  entity Transaction {\n    chargeId: String;\n    amount: Float;\n    status: String;\n  }\n}`,
  'Global Payments', 'fintech', 'Payments', 'CreditCard', 'Secure global processing', 'emerald'
);

createZip(
  'inventory-sync', '2.1.0',
  `module inventory-sync {\n  version "2.1.0"\n\n  route GET "/inventory/stock" {\n    handler "get-stock"\n    role "WAREHOUSE_MANAGER"\n  }\n\n  route POST "/inventory/webhook/register" {\n    handler "register-webhook"\n    role "WAREHOUSE_MANAGER"\n  }\n\n  route PUT "/inventory/bulk-update" {\n    handler "bulk-update"\n    role "WAREHOUSE_MANAGER"\n    timeout 60s\n  }\n\n  entity StockLevel {\n    productId: String;\n    available: Integer;\n    reserved: Integer;\n  }\n}`,
  'Inventory Pro', 'ecommerce', 'Operations', 'Package', 'Real-time stock sync', 'blue'
);

console.log('ZIPs generated successfully!');
