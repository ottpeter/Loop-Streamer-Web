# Loop-Streamer-Web

Ehhez kell egy React-App kliens oldalon, kell egy SQL szerver a másik oldalon, ami bizalmas adatokat tárol, és kellenek instance-ok.

a 'client', az tartalmaz mindent, a regisztrációtól a vásárláson át a beállításokig.
a 'server' kommunikál ezzel a klienssel, új felhasználót hoz létre, és ha az új felhasználó létrejött, gyárt hozzá egy szervert is.
érzékeli, ha hiba történt, és jelzi, e-mailt küld.
A regisztrációtól még nem történik szerver kreálás, maximum a UI felületen így tűnik, de valójában az 2 lépés. Külön van regisztráció, és vásárlás. Még akkor is, ha a felhasználó számára ez 1 gombra van egyszer$
A React-App több mappából áll, azokkal van szét szeparálva a weboldal.
client:
-components:
--Shop
---package.js
---Shop.js
--Board
---package.js
---Board.js
App.js

react-router-dom utak:
/ - landing page
/board - main board, redirect to login
/board/login

/product/
/product/small
/product/medium
/product/large
/checkout
/about
/purchase_done



## Mi az, amit meg akarsz valósítani?
  ~azt, hogy ezt az API route-ot ne lehessen meghívni kívülről, csak a rendszer tudja lefuttatni.~
  azt, hogy ezt az utat a kliens hívja meg, de nem tudja manuálisan lefuttatni (valami.com/create nem fog működni.)
  Kell egy secret, amit vagy .env-ben tárolunk vagy valahol máshol.