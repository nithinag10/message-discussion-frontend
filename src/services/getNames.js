import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';


export function AssignName (){

    const customConfig = {
        dictionaries: [adjectives, colors],
        separator: '-',
        length: 2,
      };

        return uniqueNamesGenerator(customConfig);
    

}