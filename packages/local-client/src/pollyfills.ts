import { Buffer } from 'buffer';

// @ts-ignore
Buffer.from('anything', 'base64');
// window.Buffer = Buffer;
window.Buffer = window.Buffer || require('buffer').Buffer;