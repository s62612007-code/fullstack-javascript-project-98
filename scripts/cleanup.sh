#!/usr/bin/env bash
# Script to remove files and directories unrelated to the Node project created today.
set -euo pipefail

echo "Eliminar elementos no relacionados..."
rm -rf datos-proyecto.md
rm -rf pom.xml
rm -rf app
rm -rf core
rm -rf games
rm -rf target
rm -rf .github
rm -rf .vscode
rm -rf src/main

echo "Limpieza completada. Revisa el estado con 'git status'."
