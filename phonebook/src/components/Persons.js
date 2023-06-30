 

 const Person = ({filteredPersons, persons, deletePerson}) => { 

    if (filteredPersons.length) {
      return filteredPersons.map((person, index) => 
              <div key={index}>{person.name} : {person.number} </div>)
    }
  
    return persons.map((person, index) => <div key={index}>{person.name} : {person.number} 
    <button style={{
      'backgroundColor': 'skyblue', 'color': '#000', 'borderRadius': '5px', 
      'margin': '2px', 'padding': '2px', 'cursor': 'pointer'}}
    onClick={() => deletePerson(person.id)}>delete</button> 
    </div>)
  
 }

 export default Person