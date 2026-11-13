import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                loja: resolve("index.html"),
                admin: resolve("admin.html"),
                quemSomos: resolve("quem-somos.html"),
                contato: resolve("contato.html"),
                faq: resolve("faq.html"),
                privacidade: resolve("privacidade.html"),
                seguranca: resolve("seguranca.html"),
                acessibilidade: resolve("acessibilidade.html")
            }
        }
    },
    plugins: [
        {
            name: "copiar-scripts",
            generateBundle: function() {
                this.emitFile({
                    type: "asset",
                    fileName: "logo-tech-store.svg",
                    source: readFileSync("logo-tech-store.svg", "utf8")
                });

                this.emitFile({
                    type: "asset",
                    fileName: "script.js",
                    source: readFileSync("script.js", "utf8")
                });

                this.emitFile({
                    type: "asset",
                    fileName: "admin.js",
                    source: readFileSync("admin.js", "utf8")
                });
            }
        }
    ]
});
