$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "D:\Projects\CutTayShop - ASP\docs\reports\screenshots\homepage-redesign\after"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir }

$viewports = @(
    @{ Name = "mobile-375"; Width = 375; Height = 812 },
    @{ Name = "mobile-430"; Width = 430; Height = 932 },
    @{ Name = "tablet-768"; Width = 768; Height = 1024 },
    @{ Name = "desktop-1024"; Width = 1024; Height = 768 },
    @{ Name = "desktop-1440"; Width = 1440; Height = 900 },
    @{ Name = "desktop-1536"; Width = 1536; Height = 1024 },
    @{ Name = "desktop-1920"; Width = 1920; Height = 1080 }
)

foreach ($vp in $viewports) {
    foreach ($theme in @("light", "dark")) {
        $outFile = "$outDir\$($vp.Name)-$theme.png"
        $url = "http://localhost:5139/?theme=$theme"
        $size = "$($vp.Width),$($vp.Height)"
        Write-Host "Capturing $outFile ($size)..."
        Start-Process -FilePath $edge -ArgumentList @("--headless", "--screenshot=`"$outFile`"", "--window-size=$size", "--hide-scrollbars", $url) -Wait -NoNewWindow
    }
}
Write-Host "Done capturing after screenshots."
