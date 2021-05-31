const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band ('Equipo 1'));
bands.addBand(new Band ('Equipo 2'));
bands.addBand(new Band ('The Animals'));
bands.addBand(new Band ('DaftPunk'));






// Socket Messages
io.on('connection', client => {
    console.log('Cliente conectado ');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload)=>{
        console.log('Mensaje!!!', payload);
        io.emit('mensaje',{admin:'nuevo mensaje'});
    });

    client.on('emitir-mensaje',(payload) =>{
        //io.emit('nuevo-mensaje', payload); // esto emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); // esto emite a todos menos a quien emite
        //console.log(payload);
    });

    client.on('vote-band',(payload) =>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {// para agregar nuevas bandas
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


  }); 