function return_achievements(ach){
    //primeste un numar
    //returneaza un vector de stringuri
    let list_of_ach = ['Prima calatorie', '5 Calatorii', '15 Calatorii', 'Vizita muzeu de arta', 'Vizita castel', 'Vizita Franta']
    let arr = [];
    let 
    for (i=0;ach>0;ach>>1,i++){
        if (ach%2){
            arr.push(list_of_ach[i]);
        }
    }
    return arr;
}

function add_achievement(number, ach){
    //primeste un numar si indicele achievementu-ului
    //returneaza numarul
    number |= 1<<ach;
    return number;
}

function calc_level(score){
    // returneaza un obiect cu nr nivelului (1,2,100) si cu titlul nivelului
    let list_of_levels = ['Level1', 'Level2', 'Level3', 'Level4', 'Mr. Worldwide'];
    let level = score/100 + 1;
    let index = level<=5?level:5;
    return {level: level, title: list_of_levels[index]};

}