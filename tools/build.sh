npm run build
cd build
git add .
git commit -m "live update"
git push live master
cd ../client
npm run deploy
