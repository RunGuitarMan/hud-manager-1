import { Packet } from './index.js';
import { isBinary } from './is-binary.js';

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */

export function deconstructPacket(packet: Packet) {
	const buffers: any[] = [];
	const packetData = packet.data;
	const pack = packet;
	pack.data = _deconstructPacket(packetData, buffers);
	pack.attachments = buffers.length; // number of binary 'attachments'
	return { packet: pack, buffers: buffers };
}

function _deconstructPacket(data: any, buffers: any[]) {
	if (!data) return data;

	if (isBinary(data)) {
		const placeholder = { _placeholder: true, num: buffers.length };
		buffers.push(data);
		return placeholder;
	} else if (Array.isArray(data)) {
		const newData = new Array(data.length);
		for (let i = 0; i < data.length; i++) {
			newData[i] = _deconstructPacket(data[i], buffers);
		}
		return newData;
	} else if (typeof data === 'object' && !(data instanceof Date)) {
		const newData = {} as any;
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				newData[key as any] = _deconstructPacket(data[key], buffers) as any;
			}
		}
		return newData;
	}
	return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */

export function reconstructPacket(packet: Packet, buffers: any[]) {
	packet.data = _reconstructPacket(packet.data, buffers);
	packet.attachments = undefined; // no longer useful
	return packet;
}

function _reconstructPacket(data: any, buffers: any[]) {
	if (!data) return data;

	if (data && data._placeholder) {
		return buffers[data.num]; // appropriate buffer (should be natural order anyway)
	} else if (Array.isArray(data)) {
		for (let i = 0; i < data.length; i++) {
			data[i] = _reconstructPacket(data[i], buffers);
		}
	} else if (typeof data === 'object') {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				data[key] = _reconstructPacket(data[key], buffers);
			}
		}
	}

	return data;
}
