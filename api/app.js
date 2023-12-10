import { Contract, JsonRpcProvider, Wallet } from "ethers";
// import details from "./detail.json" assert {type: "json"};
import dotenv from "dotenv";

let abi=[
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

let contract_address = "0xab538B9aCFbfDA7Ef1F17509E364cEc3f75C3bd7"



dotenv.config();

const provider = new JsonRpcProvider("https://sepolia.infura.io/v3/49583999f33e4939abbe49573ee2c44e");
const wallet = new Wallet(process.env.Private_Key, provider);
const instance = new Contract(contract_address, abi, wallet);

export default instance;