@echo off
REM ═══════════════════════════════════════════════════════════════════
REM  Collectiverse Character Poses — Upload ALL to S3 + Commit to GitHub
REM ═══════════════════════════════════════════════════════════════════
REM
REM  Prerequisites:
REM    - aws sso login --profile collectiverse-prod
REM    - Git configured with push access to atlas-ip
REM
REM  What this does:
REM    1. Copies ALL character poses (7 Keepers + 8 Villains) into atlas-ip repo
REM    2. Syncs all character images to S3 PROD (collectiverse-assets-prod)
REM    3. Syncs all character images to S3 DEV (collectiverse-assets-dev)
REM    4. Git commits and pushes to atlas-ip
REM
REM  Characters (578 total images):
REM    Keepers: echo(40), forge(41), ink(41), pixel(40), porter(41), sterling(42)
REM    Villains: thebroker(40), thecounterfeiter(45), thehacker(41), thehoarder(42),
REM              therestorer(41), thesmuggler(40), thevault(41), thewhisper(40)
REM    Other: hq(1), vehicle(2)
REM
REM ═══════════════════════════════════════════════════════════════════

set IP_DIR=C:\Users\bellgj\Documents\Personal\collectiverse data\ip
set ATLAS_IP_DIR=C:\Users\bellgj\Documents\Personal\collectiverse\atlas-ip
set S3_BUCKET_PROD=collectiverse-assets-prod
set S3_BUCKET_DEV=collectiverse-assets-dev
set AWS_PROFILE=collectiverse-prod

echo.
echo ═══════════════════════════════════════════════════════════════════
echo  Step 1: Copy ALL poses into atlas-ip repo
echo ═══════════════════════════════════════════════════════════════════
echo.

echo --- KEEPERS ---
echo Copying Ink (41 poses)...
xcopy "%IP_DIR%\ink\*.png" "%ATLAS_IP_DIR%\poses\originals\ink\" /E /I /Y /Q
echo Copying Pixel (40 poses)...
xcopy "%IP_DIR%\pixel\*.png" "%ATLAS_IP_DIR%\poses\originals\pixel\" /E /I /Y /Q
echo Copying Sterling (42 poses)...
xcopy "%IP_DIR%\sterling\*.png" "%ATLAS_IP_DIR%\poses\originals\sterling\" /E /I /Y /Q
echo Copying Forge (41 poses)...
xcopy "%IP_DIR%\forge\*.png" "%ATLAS_IP_DIR%\poses\originals\forge\" /E /I /Y /Q
echo Copying Porter (41 poses)...
xcopy "%IP_DIR%\porter\*.png" "%ATLAS_IP_DIR%\poses\originals\porter\" /E /I /Y /Q
echo Copying Echo (40 poses)...
xcopy "%IP_DIR%\echo\*.png" "%ATLAS_IP_DIR%\poses\originals\echo\" /E /I /Y /Q
echo.

echo --- VILLAINS ---
echo Copying The Broker (40 poses)...
xcopy "%IP_DIR%\thebroker\*.png" "%ATLAS_IP_DIR%\poses\originals\thebroker\" /E /I /Y /Q
echo Copying The Counterfeiter (45 poses)...
xcopy "%IP_DIR%\thecounterfeiter\*.png" "%ATLAS_IP_DIR%\poses\originals\thecounterfeiter\" /E /I /Y /Q
echo Copying The Hacker (41 poses)...
xcopy "%IP_DIR%\thehacker\*.png" "%ATLAS_IP_DIR%\poses\originals\thehacker\" /E /I /Y /Q
echo Copying The Hoarder (42 poses)...
xcopy "%IP_DIR%\thehoarder\*.png" "%ATLAS_IP_DIR%\poses\originals\thehoarder\" /E /I /Y /Q
echo Copying The Restorer (41 poses)...
xcopy "%IP_DIR%\therestorer\*.png" "%ATLAS_IP_DIR%\poses\originals\therestorer\" /E /I /Y /Q
echo Copying The Smuggler (40 poses)...
xcopy "%IP_DIR%\thesmuggler\*.png" "%ATLAS_IP_DIR%\poses\originals\thesmuggler\" /E /I /Y /Q
echo Copying The Vault (41 poses)...
xcopy "%IP_DIR%\thevault\*.png" "%ATLAS_IP_DIR%\poses\originals\thevault\" /E /I /Y /Q
echo Copying The Whisper (40 poses)...
xcopy "%IP_DIR%\thewhisper\*.png" "%ATLAS_IP_DIR%\poses\originals\thewhisper\" /E /I /Y /Q
echo.

echo --- OTHER ---
echo Copying HQ (1 image)...
xcopy "%IP_DIR%\hq\*.png" "%ATLAS_IP_DIR%\poses\originals\hq\" /E /I /Y /Q
echo Copying Vehicle (2 images)...
xcopy "%IP_DIR%\vehicle\*.png" "%ATLAS_IP_DIR%\poses\originals\vehicle\" /E /I /Y /Q
echo.

echo ✓ All poses copied to atlas-ip/poses/originals/
echo.

echo ═══════════════════════════════════════════════════════════════════
echo  Step 2: Upload to S3 PROD
echo ═══════════════════════════════════════════════════════════════════
echo.

echo Syncing to s3://%S3_BUCKET_PROD%/ip/characters/...
aws s3 sync "%IP_DIR%" "s3://%S3_BUCKET_PROD%/ip/characters/" --profile %AWS_PROFILE% --exclude "*.cmd" --exclude "README.md" --exclude "*.docx"
echo.

if %ERRORLEVEL% NEQ 0 (
    echo ✗ S3 PROD sync failed! Is your SSO session active?
    echo   Run: aws sso login --profile collectiverse-prod
    pause
    exit /b 1
)

echo ✓ S3 PROD upload complete
echo.

echo ═══════════════════════════════════════════════════════════════════
echo  Step 3: Upload to S3 DEV
echo ═══════════════════════════════════════════════════════════════════
echo.

echo Syncing to s3://%S3_BUCKET_DEV%/ip/characters/...
aws s3 sync "%IP_DIR%" "s3://%S3_BUCKET_DEV%/ip/characters/" --profile %AWS_PROFILE% --exclude "*.cmd" --exclude "README.md" --exclude "*.docx"
echo.

if %ERRORLEVEL% NEQ 0 (
    echo ✗ S3 DEV sync failed! Continuing anyway...
    echo.
) else (
    echo ✓ S3 DEV upload complete
    echo.
)

echo ═══════════════════════════════════════════════════════════════════
echo  Step 4: Git commit + push (atlas-ip)
echo ═══════════════════════════════════════════════════════════════════
echo.

cd /d "%ATLAS_IP_DIR%"

git add poses/originals/
git status --short

echo.
echo About to commit and push. Press Ctrl+C to cancel.
pause

git commit -m "Add all character poses: 7 Keepers + 8 Villains (578 images)"
git push

if %ERRORLEVEL% NEQ 0 (
    echo ✗ Git push failed! Check your credentials.
    pause
    exit /b 1
)

echo.
echo ═══════════════════════════════════════════════════════════════════
echo  ✓ DONE — All characters uploaded
echo ═══════════════════════════════════════════════════════════════════
echo.
echo  S3 PROD: s3://%S3_BUCKET_PROD%/ip/characters/
echo  S3 DEV:  s3://%S3_BUCKET_DEV%/ip/characters/
echo  Repo:    atlas-ip/poses/originals/{all characters}/
echo  Status:  Committed and pushed to GitHub
echo.
echo  Characters synced (16):
echo    Keepers:  echo, forge, ink, pixel, porter, sterling
echo    Villains: thebroker, thecounterfeiter, thehacker, thehoarder,
echo              therestorer, thesmuggler, thevault, thewhisper
echo    Other:    hq, vehicle
echo.
pause
