import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import * as moment from 'moment';
import 'moment-duration-format';

// eslint-disable-next-line
const { version } = require('../../../../package.json');

export default class StatsCommand extends Command {
	public constructor() {
		super('stats', {
			aliases: ['stats'],
			description: {
				content: 'Displays statistics about the bot.',
			},
			category: 'util',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const embed = new MessageEmbed()
			.setColor(3447003)
			.setDescription(`**${this.client.user!.username} Statistics**`)
			.addField('❯ Uptime', moment.duration(this.client.uptime!).format('d[d ]h[h ]m[m ]s[s]'), true)
			.addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
			.addField(
				'❯ General Stats',
				stripIndents`
				• Guilds: ${this.client.guilds.cache.size}
				• Channels: ${this.client.channels.cache.size}
			`,
				true,
			)
			.addField('❯ Version', `v${version}`, true)
			.addField('❯ Source Code', '[View Here](https://github.com/LISTEN-moe/discord-bot)', true)
			.addField(
				'❯ Library',
				'[discord.js](https://discord.js.org)[-akairo](https://github.com/1Computer1/discord-akairo)',
				true,
			)
			.setThumbnail(this.client.user!.displayAvatarURL())
			.setFooter(`© 2018-2020 ${this.client.users.cache.get(this.client.config.owner!)!.tag}`);

		return message.util!.send(embed);
	}
}
