REM Configuration
SET demoOrg=lightweightjsonutil

REM Deploy the custom implementation files
sf project deploy start --source-dir force-app/demo --target-org %demoOrg%
