let express = require('express')
import simData from "./simulator.js";


class Simulator {

    constructor() {
        const [wind, elcon, price] = await sendSimData();
        this.wind = wind;
        this.elcon = elcon;
        this.price = price
    }
};







