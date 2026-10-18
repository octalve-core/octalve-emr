# Safe optional local handoff. Never force-push or change Finance.
# Run only after verifying the actual remote repository and its existing content.
$ErrorActionPreference = "Stop"
$repo = "https://github.com/octalve-core/octalve-emr.git"
if (-not (Test-Path './package.json')) { throw "Run from the octalve-emr source root." }
if ((Get-Content './package.json' -Raw) -notmatch '"name": "octalve-emr"') { throw "Not the expected EMR project." }
if (Test-Path '.git') { throw "Already a git repository. Inspect git remote -v / git branch -av before changes." }
Write-Host "Inspect the existing GitHub repository first: $repo"
Write-Host "If the remote already has main: clone it to an EMPTY separate folder, create a phase/00-emr-foundation branch, and add these EMR source files there. Do not overwrite README or other remote files blindly."
Write-Host "If the remote is truly empty: create a minimal main baseline, then create phase/00-emr-foundation from that base and commit these EMR files on phase only."
Write-Host "Do not force-push. Do not merge to main until tests, Vercel Review and owner approval."
