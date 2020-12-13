let express = require('express')
import simData from "./simulator.js";


class Simulator {

    constructor() {
        const [wind, elcon, price] = await sendSimData();
        this.wind = wind;
        this.elcon = elcon;
        this.price = price
    }

updateDB() {

    simData.findOne({ id: '1' }, function (err, simDAta) {
        if (err)
            res.send(err);

            simDAta.windSpeed = wind;
            simDAta.electricityConsumption = elcon;
            simDAta.price = price;
//save and check errors
            simDAta.save(function (err) {
            if (err)
                res.json(err);
            else res.send("Updated succesfully")

        });
    });
}

}







