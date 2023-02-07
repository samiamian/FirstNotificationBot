import fetch from 'node-fetch';
import AffirmationDataModel from "../types/AffirmationModel";

export class AffirmationService {

    public async getAffirmations(): Promise<AffirmationDataModel> {
        try{
            const response = await fetch('https://type.fit/api/quotes');
            const data: any = await response.json();
            const aVal = data[Math.floor(Math.random() * data.length)];
            return {text: aVal.text,author: aVal.author} as AffirmationDataModel
        }
        catch{
            return {text: "Sorry!! Our Service is down today.",author: "N/A."};
        }
    }
}

const aService = new AffirmationService();
export default aService;