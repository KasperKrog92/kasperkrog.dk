# Regenerate web icons from the approved, transparent gold monogram.
# Run from any directory with PowerShell on Windows. No site build step.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$source = Join-Path $root 'assets/kk-logo.png'

foreach ($size in @(16, 32, 48, 64, 180)) {
    $target = Join-Path $env:TEMP "kk-favicon-$size.png"
    & ffmpeg -hide_banner -loglevel error -i $source -vf "scale=${size}:${size}:flags=lanczos" -frames:v 1 -y $target
    if ($LASTEXITCODE -ne 0) { throw "Icon resize failed: $size" }
}
Copy-Item (Join-Path $env:TEMP 'kk-favicon-64.png') (Join-Path $root 'assets/favicon.png') -Force

# iOS supplies its own rounded mask; use an opaque mineral background.
$apple = [System.Drawing.Bitmap]::new(180, 180)
$graphics = [System.Drawing.Graphics]::FromImage($apple)
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#f4f5f3'))
$mark = [System.Drawing.Image]::FromFile((Join-Path $env:TEMP 'kk-favicon-180.png'))
$graphics.DrawImage($mark, 9, 9, 162, 162)
$apple.Save((Join-Path $root 'assets/apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$mark.Dispose()
$graphics.Dispose()
$apple.Dispose()

# ICO directory containing three lossless PNG images.
$sizes = @(16, 32, 48)
$images = @($sizes | ForEach-Object { ,([IO.File]::ReadAllBytes((Join-Path $env:TEMP "kk-favicon-$_.png"))) })
$stream = [IO.File]::Create((Join-Path $root 'assets/favicon.ico'))
$writer = [IO.BinaryWriter]::new($stream)
$writer.Write([uint16]0); $writer.Write([uint16]1); $writer.Write([uint16]3)
$offset = 6 + 16 * 3
for ($i = 0; $i -lt 3; $i++) {
    $writer.Write([byte]$sizes[$i]); $writer.Write([byte]$sizes[$i])
    $writer.Write([byte]0); $writer.Write([byte]0)
    $writer.Write([uint16]1); $writer.Write([uint16]32)
    $writer.Write([uint32]$images[$i].Length); $writer.Write([uint32]$offset)
    $offset += $images[$i].Length
}
foreach ($bytes in $images) { $writer.Write([byte[]]$bytes) }
$writer.Dispose()
Copy-Item (Join-Path $root 'assets/favicon.ico') (Join-Path $root 'favicon.ico') -Force
