write-host "`n  ## NODEJS INSTALLER ## `n"

### CONFIGURATION

# nodejs
$version = "14.18.1"
$url = "https://nodejs.org/dist/v$version/node-v$version-x64.msi"

# activate / desactivate any install
$install_node = $TRUE

write-host "`n----------------------------"
write-host " system requirements checking  "
write-host "----------------------------`n"

### require administator rights

if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
   write-Warning "This setup needs admin permissions. Please run this file as admin."     
   break
}

### nodejs version check

if (Get-Command node -errorAction SilentlyContinue) {
    $current_version = (node -v)
}
 
if ($current_version) {
    write-host "[NODE] nodejs $current_version already installed"
    $confirmation = read-host "Are you sure you want to replace this version ? [y/N]"
    if ($confirmation -ne "y") {
        $install_node = $FALSE
    }
}

write-host "`n"

if ($install_node) {
    
    ### download nodejs msi file
    # warning : if a node.msi file is already present in the current folder, this script will simply use it
        
    write-host "`n----------------------------"
    write-host "  nodejs msi file retrieving  "
    write-host "----------------------------`n"

    $filename = "node.msi"
    $node_msi = "$PSScriptRoot\$filename"
    
    $download_node = $TRUE

    if (Test-Path $node_msi) {
        $confirmation = read-host "Local $filename file detected. Do you want to use it ? [Y/n]"
        if ($confirmation -eq "n") {
            $download_node = $FALSE
        }
    }

    if ($download_node) {
        write-host "[NODE] downloading nodejs install"
        write-host "url : $url"
        $start_time = Get-Date
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url, $node_msi)
        write-Output "$filename downloaded"
        write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "using the existing node.msi file"
    }

    ### nodejs install

    write-host "`n----------------------------"
    write-host " nodejs installation  "
    write-host "----------------------------`n"

    write-host "[NODE] running $node_msi"
    Start-Process $node_msi -Wait
    
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User") 
    
} else {
    write-host "Proceeding with the previously installed nodejs version ..."
}

### npm packages install

write-host "`n----------------------------"
write-host "      npm yo installation  "
write-host "----------------------------`n"

$install_yo = $TRUE

if (Get-Command yo -errorAction SilentlyContinue) {
    $yo_prev_v = (yo --version)
}

if ($yo_prev_v) {
    write-host "[YEOMAN] Yo is already installed :"
    write-host $yo_prev_v
    
    $confirmation = read-host "Are you sure you want to replace this version ? [y/N]"
    if ($confirmation -ne "y") {
        $install_yo = $FALSE
    }
}

if ($install_yo) {
    write-host "Installing Yeoman"
    npm install --global yo
}

### clean

write-host "`n----------------------------"
write-host " system cleaning "
write-host "----------------------------`n"

$confirmation = read-host "Delete install files ? [y/N]"
if ($confirmation -eq "y") {
    if ($node_msi -and (Test-Path $node_msi)) {
        rm $node_msi
    }
}


write-host "Done !"