import NodeCache from "node-cache";


const myCache = new NodeCache();


export default async () => {
    
    const currentWind = wind();
    const elConsumed = electricityConsumption();
    const price = price(currentWind,elConsumed);

    
    return {currentWind,elConsumed,price};
};


function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}


//https://www.sitepoint.com/delay-sleep-pause-wait/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//https://www.sodrahallandskraft.se/produkter-och-priser/elnaet/sveriges-elnaet-lite-fakta/elanvaendning-i-sverige/
// mellan 6000kwh-> 250000 kwh
 


export const wind = () => {

    windMin = myCache.take("windMin");
    windMax = myCache.take("windMax");
    if(windMin = undefined) {
        windMin = 0.0;
        windMax = 40.0;
    }
    currentWind = randn_bm(windMin, windMax,1);
    windMin = currentWind-5.0;
    windMax = currentWind+5.0;
    if(windMin < 0.0 || windMax > 40.0) {
        windMin = windMin+5.0;
        windMax = windMax-5.0;
    }
    myCache.set("windMin", windMin);
    myCache.set("windMax", windMax);
    return currentWind;

};

export const electricityConsumption = () => {
    eleMin = myCache.take("eleMin");
    eleMax = myCache.take("eleMax");
    if(eleMin = undefined) {
        eleMin = 6.0;
        eleMax = 25.0;
    }
    eleconsumed = randn_bm(eleMin, eleMax,1);
    eleMin = eleconsumed-2.0;
    eleMax = eleconsumed+2.0;
    if(eleMin < 6.0 || eleMax > 25.0) {
        eleMin = eleMin+2.0;
        eleMax = eleMax-2.0;
    }

    myCache.set("eledMin", eleMin);
    myCache.set("eledMax", eleMax);
    return eleconsumed;

};  


export const price = (currentWind, elConsumed) => {
    price = 50.0 + (electricity-wind);
    return price;
};
