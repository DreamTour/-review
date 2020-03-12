import React, { Component } from 'react'
const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
        </tr>
        </thead>
    )
}
const TableBody = (props) => {
    return (
        <tbody>
        {props.characterData.map((value,index,array)=>{
            return <tr key={index}>
                <td>{value.name}</td>
                <td>{value.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>
        })}
        </tbody>
    )
}

class Table extends Component {
 render(){
     const {characterData,removeCharacter}=this.props;
     return (
         <table>
             <TableHeader />
             <TableBody characterData={characterData} removeCharacter={removeCharacter}/>
         </table>
     );
 }
}

export default Table