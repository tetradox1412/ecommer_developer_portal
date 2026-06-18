package com.devportal.bff.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.Comparator;
import java.util.zip.*;

@Slf4j
@Service
public class DslEngineService {

    private static final String CLI_DIR =
        "C:/Mridul Joy/Programming/Software Grid/Giolit Ecommerce/Developer Console" +
        "/Hospital-DSL-f2d48c4c35fc96526d2fdb10bdd8c5a14254ac85" +
        "/Hospital-DSL-f2d48c4c35fc96526d2fdb10bdd8c5a14254ac85/v1";

    public byte[] generate(String schemaContent, String viewsContent) throws Exception {
        Path workDir = Files.createTempDirectory("dsl-");
        try {
            Path schemaFile = workDir.resolve("project.schema");
            Path viewsFile  = workDir.resolve("project.views");
            Path outputDir  = workDir.resolve("generated");
            Files.writeString(schemaFile, schemaContent);
            if (viewsContent != null && !viewsContent.isBlank()) {
                Files.writeString(viewsFile, viewsContent);
            }
            Files.createDirectories(outputDir);

            String projectPrefix = schemaFile.toString().replace("\\", "/").replace(".schema", "");

            // Resolve node executable (Windows PATH may not be inherited by Java)
            String nodeExe = resolveNode();

            ProcessBuilder pb = new ProcessBuilder(
                nodeExe, "cli.js", "generate",
                projectPrefix,
                outputDir.toString().replace("\\", "/")
            );
            pb.directory(new File(CLI_DIR));
            pb.redirectErrorStream(true);
            Process process = pb.start();

            String output = new String(process.getInputStream().readAllBytes());
            int exitCode = process.waitFor();
            log.info("DSL engine output:\n{}", output);

            if (exitCode != 0) {
                throw new RuntimeException("DSL generation failed:\n" + output);
            }

            return zipDirectory(outputDir);
        } finally {
            deleteDirectory(workDir);
        }
    }

    public String validate(String schemaContent, String viewsContent) throws Exception {
        Path workDir = Files.createTempDirectory("dsl-val-");
        try {
            Path schemaFile = workDir.resolve("project.schema");
            Path viewsFile  = workDir.resolve("project.views");
            Files.writeString(schemaFile, schemaContent);
            if (viewsContent != null && !viewsContent.isBlank()) {
                Files.writeString(viewsFile, viewsContent);
            }
            String projectPrefix = schemaFile.toString().replace("\\", "/").replace(".schema", "");
            ProcessBuilder pb = new ProcessBuilder(
                resolveNode(), "cli.js", "validate", projectPrefix
            );
            pb.directory(new File(CLI_DIR));
            pb.redirectErrorStream(true);
            Process process = pb.start();
            String output = new String(process.getInputStream().readAllBytes());
            process.waitFor();
            return output;
        } finally {
            deleteDirectory(workDir);
        }
    }

    private String resolveNode() {
        // Try plain 'node' first (works if Node is on system PATH)
        String[] candidates = {
            "node",
            "C:/Program Files/nodejs/node.exe",
            "C:/Program Files (x86)/nodejs/node.exe",
            System.getenv("APPDATA") != null
                ? System.getenv("APPDATA") + "/npm/node.exe" : null,
        };
        for (String candidate : candidates) {
            if (candidate == null) continue;
            try {
                Process test = new ProcessBuilder(candidate, "--version")
                    .redirectErrorStream(true).start();
                test.waitFor();
                if (test.exitValue() == 0) return candidate;
            } catch (Exception ignored) {}
        }
        return "node"; // fallback — will produce a clear error in CLI output
    }

    private byte[] zipDirectory(Path sourceDir) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            Files.walk(sourceDir)
                .filter(p -> !Files.isDirectory(p))
                .forEach(file -> {
                    String entryName = sourceDir.relativize(file).toString().replace("\\", "/");
                    try {
                        zos.putNextEntry(new ZipEntry(entryName));
                        Files.copy(file, zos);
                        zos.closeEntry();
                    } catch (IOException e) {
                        throw new UncheckedIOException(e);
                    }
                });
        }
        return baos.toByteArray();
    }

    private void deleteDirectory(Path dir) {
        try {
            Files.walk(dir)
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
        } catch (IOException e) {
            log.warn("Could not clean up temp dir: {}", dir, e);
        }
    }
}
