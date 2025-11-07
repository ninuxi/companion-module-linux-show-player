#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n')
}

function updatePackageJson() {
  const pkgPath = path.join(repoRoot, 'package.json')
  const pkg = readJson(pkgPath)
  pkg.name = '@companion-module/linux-show-player'
  if (!pkg.keywords) pkg.keywords = []
  for (const k of ['companion', 'companion-module', 'linux-show-player', 'lsp', 'osc']) {
    if (!pkg.keywords.includes(k)) pkg.keywords.push(k)
  }
  // Ensure files include companion and dist
  pkg.files = Array.from(new Set([...(pkg.files || []), 'companion/**/*', 'dist/**/*', 'README.md', 'LICENSE.md']))
  writeJson(pkgPath, pkg)
  console.log('Updated package.json name to @companion-module/linux-show-player')
}

function updateReadme() {
  const readmePath = path.join(repoRoot, 'README.md')
  if (!fs.existsSync(readmePath)) return
  let content = fs.readFileSync(readmePath, 'utf8')
  // Replace install line to use scoped package
  content = content.replace(/npm install .*linux-show-player.*/i, 'npm install @companion-module/linux-show-player')
  // Add npm badge if missing
  if (!content.includes('img.shields.io/npm/v')) {
    const badge = '[![npm version](https://img.shields.io/npm/v/%40companion-module%2Flinux-show-player.svg)](https://www.npmjs.com/package/@companion-module/linux-show-player)\n\n'
    content = badge + content
  }
  fs.writeFileSync(readmePath, content)
  console.log('Updated README install instructions and added badge (if missing)')
}

function updateManifest() {
  const manifestPath = path.join(repoRoot, 'companion', 'manifest.json')
  if (!fs.existsSync(manifestPath)) return
  const m = readJson(manifestPath)
  // Keep id as-is; ensure repository/bugs point to current repo
  m.repository = 'https://github.com/ninuxi/companion-module-linux-show-player'
  m.bugs = 'https://github.com/ninuxi/companion-module-linux-show-player/issues'
  writeJson(manifestPath, m)
  console.log('Verified manifest repository/bugs')
}

updatePackageJson()
updateReadme()
updateManifest()
console.log('Scope migration changes applied. Review, commit, and publish with npm.')
