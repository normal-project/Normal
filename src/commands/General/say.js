const {Command} = require('klasa'); //klasa


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'say',
            enabled: true,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: ['speak'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Envía un mensaje por MD a un usuario (uso para devs)',
            quotedStringSupport: false,
            extendedHelp: 'Envía un mensaje a un usuario por MD para notificaciones del bot (blacklist, solicitud de algo, etc.)',
            usage: '<msg:string>',
            usageDelim: ' ' 
        });
    }
        
    async run(message, [msg]) {
        message.delete();
        message.channel.send(msg);
    }
}
