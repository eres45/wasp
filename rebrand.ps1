# Wasp Code Rebranding Script
$patterns = @(
    @{ Old = '"continue"'; New = '"wasp-code"' },
    @{ Old = "'continue'"; New = "'wasp-code'" },
    @{ Old = "continue\."; New = "waspcode." },
    @{ Old = "Continue"; New = "Wasp Code" },
    @{ Old = "CONTINUE"; New = "WASPCODE" },
    @{ Old = "continueGUIView"; New = "waspcodeGUIView" },
    @{ Old = "continueConsoleView"; New = "waspcodeConsoleView" },
    @{ Old = "continueSubMenu"; New = "waspcodeSubMenu" },
    @{ Old = "continue.dev"; New = "waspcode.dev" },
    @{ Old = "continuedev"; New = "waspcode" },
    @{ Old = "Continue Dev, Inc"; New = "Wasp Code" }
)

$excludePatterns = @("node_modules", "\.git", "dist", "build", "\.next", "coverage", "rebrand.ps1")

function Should-Process-File {
    param([string]$FilePath)
    foreach ($exclude in $excludePatterns) {
        if ($FilePath -match $exclude) {
            return $false
        }
    }
    return $true
}

$files = Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
    Should-Process-File $_.FullName
} | Where-Object {
    $_.Extension -in @(".json", ".ts", ".tsx", ".js", ".jsx", ".md", ".yaml", ".yml")
}

Write-Host "Processing $($files.Count) files..."

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
        if ($null -eq $content) { continue }
        
        $modified = $false
        foreach ($pattern in $patterns) {
            if ($content -match [regex]::Escape($pattern.Old)) {
                $content = $content -replace [regex]::Escape($pattern.Old), $pattern.New
                $modified = $true
            }
        }
        
        if ($modified) {
            Set-Content $file.FullName $content -Encoding UTF8
            Write-Host "✓ $($file.FullName)"
        }
    }
    catch {
        Write-Host "✗ Error processing $($file.FullName): $_"
    }
}

Write-Host "Done!"
