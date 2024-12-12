const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');

// Gerar uma frase mnemônica
const mnemonic = bip39.generateMnemonic();
console.log('Frase mnemônica:', mnemonic);

// Derivar a chave mestre a partir da frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed, bitcoin.networks.testnet);

// Derivar uma conta a partir da chave mestre
const account = root.derivePath("m/44'/1'/0'");
const node = account.derive(0).derive(0);

// Criar um par de chaves na rede testnet
const { address } = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: bitcoin.networks.testnet
});

console.log('Endereço da carteira:', address);
console.log('Chave privada:', node.toWIF());
