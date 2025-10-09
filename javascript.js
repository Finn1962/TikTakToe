//Spieler erstellen
const spieler = (name, marker) => {
    return {
        name,
        marker,
        ausgabeSpieler() {
            console.log(`Name: ${name}, Marker: ${marker}`);
        }
    }
}


//Spielfeld erstellen
const erstelleSpielfeld = (function(){
    const spielfeld = [["","",""],["","",""],["","",""]];
    return {
        spielfeld,
        ausgabeSpielfeld(){
            console.log(erstelleSpielfeld.spielfeld);
        }
    }
})();

//Spiel Logik
const spielLogik = ()=>{
    let eingabeXKor;
    let eingabeYKor;
    let spielBeendet = false;

    function neueRunde(){
        if (spielBeendet) return;
        eingabeZug(spieler1);
        pruefeGewinner("X");
        if (spielBeendet) return;
        eingabeZug(spieler2);
        pruefeGewinner("O");        
        
        function eingabeZug(spieler){
            eingabeXKor = Number(prompt(`${spieler.name} ist dran. X-Koordinate:`));
            eingabeYKor = Number(prompt(`${spieler.name} ist dran. Y-Koordinate:`));
            while(erstelleSpielfeld.spielfeld[eingabeYKor][eingabeXKor] !== ""){
                alert("Feld bereits belegt. Bitte erneut eingeben.");
                eingabeXKor = Number(prompt(`${spieler.name} ist dran. X-Koordinate:`));
                eingabeYKor = Number(prompt(`${spieler.name} ist dran. Y-Koordinate:`));
            }
            erstelleSpielfeld.spielfeld[eingabeYKor][eingabeXKor] = spieler.marker;
        }

        function pruefeGewinner(XO){
            if((erstelleSpielfeld.spielfeld[0][0] == XO && erstelleSpielfeld.spielfeld[0][1] == XO && erstelleSpielfeld.spielfeld[0][2] == XO)||
            (erstelleSpielfeld.spielfeld[1][0] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[1][2] == XO)||
            (erstelleSpielfeld.spielfeld[2][0] == XO && erstelleSpielfeld.spielfeld[2][1] == XO && erstelleSpielfeld.spielfeld[2][2] == XO)||

            (erstelleSpielfeld.spielfeld[0][0] == XO && erstelleSpielfeld.spielfeld[1][0] == XO && erstelleSpielfeld.spielfeld[2][0] == XO)||
            (erstelleSpielfeld.spielfeld[0][1] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[2][1] == XO)||
            (erstelleSpielfeld.spielfeld[0][2] == XO && erstelleSpielfeld.spielfeld[1][2] == XO && erstelleSpielfeld.spielfeld[2][2] == XO)||

            (erstelleSpielfeld.spielfeld[0][0] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[2][2] == XO)||
            (erstelleSpielfeld.spielfeld[2][0] == XO && erstelleSpielfeld.spielfeld[1][1] == XO && erstelleSpielfeld.spielfeld[0][2] == XO)
            ){
                spielBeendet = true;
            }
        };
    };
    
    return {
        neueRunde,
        get spielBeendet(){ return spielBeendet; },
    };
};


//Globaler Code
const spieler1 = spieler("Tom","X");
const spieler2 = spieler("Alice","O");
const spiel = spielLogik(); 

while(!spiel.spielBeendet){
    spiel.neueRunde();
    erstelleSpielfeld.ausgabeSpielfeld();
}

alert("Spiel beendet!");