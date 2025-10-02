const erstelleSpielfeld = (function(){
    const spielfeld = [["","",""],["","",""],["","",""]];
    function ausgabeSpielfeld(){
        console.log(spielfeld);
    };

    return {
        ausgabeSpielfeld
    }
})();

erstelleSpielfeld.ausgabeSpielfeld();