# Regenerate the web icons: the brass station ring from the route, on a
# near-black rounded square. Mirrors assets/favicon.svg (a 32-unit grid:
# corner radius 7, ring radius 8.5, ring width 4.5).
# Run from any directory with PowerShell on Windows. No site build step.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$ink = [System.Drawing.ColorTranslator]::FromHtml('#16181a')
$brass = [System.Drawing.ColorTranslator]::FromHtml('#c9a960')

function New-StationIcon([int]$size, [bool]$rounded) {
    $unit = $size / 32
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)

    $fill = [System.Drawing.SolidBrush]::new($ink)
    if ($rounded) {
        $d = 14 * $unit
        $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
        $path.AddArc(0, 0, $d, $d, 180, 90)
        $path.AddArc($size - $d, 0, $d, $d, 270, 90)
        $path.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
        $path.AddArc(0, $size - $d, $d, $d, 90, 90)
        $path.CloseFigure()
        $graphics.FillPath($fill, $path)
        $path.Dispose()
    } else {
        # iOS applies its own mask, so the touch icon stays square and opaque.
        $graphics.FillRectangle($fill, 0, 0, $size, $size)
    }

    $pen = [System.Drawing.Pen]::new($brass, 4.5 * $unit)
    $r = 8.5 * $unit
    $graphics.DrawEllipse($pen, 16 * $unit - $r, 16 * $unit - $r, 2 * $r, 2 * $r)

    $pen.Dispose(); $fill.Dispose(); $graphics.Dispose()
    return $bitmap
}

foreach ($size in @(16, 32, 48, 64)) {
    $icon = New-StationIcon $size $true
    $icon.Save((Join-Path $env:TEMP "kk-favicon-$size.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $icon.Dispose()
}
Copy-Item (Join-Path $env:TEMP 'kk-favicon-64.png') (Join-Path $root 'assets/favicon.png') -Force

$apple = New-StationIcon 180 $false
$apple.Save((Join-Path $root 'assets/apple-touch-icon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
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
