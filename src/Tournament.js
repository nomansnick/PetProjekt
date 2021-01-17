import React from "react";

function Tournament() {
    return (
        <div>
        <div>egy cim- tournament grounds -pl</div>
        <div>egy gomb ami minden 50hp feletti épp szabad host groupba pakol, ugyanannyi ellenséget kijelöl</div>
        <div>otletek: guard faction a nyeresekert, fame a nyeresekért, gyakorlas - tierek fame szerint, statot novel,
            minden karakternek tier1: 1 stat, tier2 2 stat, tier 3 3 stat, osszesen 1x lehet mindet
        </div>
        <div>kombat: kor szamlalo, a kor dex alapjan szetszorja a sorrendet, attak, def, abilityOffensiv, abilityDefensiv</div>
        <div>kombat in-depth: gomb utan selectTargetOffensive v selectTargetDefensive stat, cancel gombbal ezt falsera teszed, de a korod megmarad,
            selectTarget alatt az ellenseges es saját divek gombnak megfeleloen kattinthatoak,
            ha hp 40 alá esik, akkor yieldel az illeto
        </div>
        <div>vmi goofi leiras</div>
        </div>
    )
}

export default Tournament;