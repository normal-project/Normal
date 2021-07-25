/* Client main file */

//TODO añadir el codigo del cooldown  del guildonly y del perms
// Libs
import { Client, Collection } from 'discord.js';
import { connect } from 'mongoose';
import { readdir, readdirSync } from 'fs';
import path from 'path';
import { Command, Event, Config } from '../types';
require('dotenv').config()

// Clase extClient (extended CLient)
export default class extClient extends Client {
	// Crear colecciones para comandos, eventos, aliases y cooldown
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, Command> = new Collection();
	public cooldown: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();

	// Configurar el bot
	public config: Config = {
		prefix: '.',
		token: process.env.TOKEN || '',
		// Tengo que poner el || '' porque si no me salta el error TS2322 ya
		// que la variable de entorno TOKEN puede ser undefined
		mongoURI: undefined
	}

	// Iniciar bot
	public async init(){
		// Conexión con Discord
		this.login(this.config.token)

		// Conexión con Mongo DB
		if (typeof this.config.mongoURI == 'string'){
			connect(this.config.mongoURI, {
				useUnifiedTopology: true,
				useFindAndModify: true,
				useNewUrlParser: true
			})
		}

		// Recopilar comandos
		const commandPath = path.join(__dirname, '..', 'commands');
		readdirSync(commandPath).forEach(dir => {
			const commands = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.ts'))

			for(const file of commands){
				const {command} = require(`${commandPath}/${dir}/${file}`);
				this.commands.set(command.name, command);

				if(command?.aliases.length !== 0){
					command.aliases.forEach((alias: string) => {
						this.aliases.set(alias, command)
					});
				}
			}
		});
	}
	
}