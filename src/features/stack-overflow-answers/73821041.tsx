// https://stackoverflow.com/questions/73821041/javascript-filter-returning-two-individual-objects-rather-than-array
import React, {useState} from 'react'
import { Button } from 'antd'

function ObjectsFilter() {

  const kids = {
    areaId: "0x2132425",
    inputs: [
      {
        name: "anne",
        gender: "girl",
        age: 6,
        attendsSchool: true,
        _id: "632c78ddae73c67bf67ff2d7",
      },
      {
        name: "bob",
        gender: "boy",
        age: 7,
        attendsSchool: true,
        _id: "632c78ddae73c67bf67ff2d8",
      },
      {
        name: "charlie",
        gender: "boy",
        age: 2,
        attendsSchool: false,
        _id: "632c78ddae73c67bf67ff2d9",
      },
    ]
  }

  const pupils = kids.inputs.filter(k => k.attendsSchool).length;

  //const number = pupils.length

  return (
   <>
   {/* <Button onClick={() => console.log(number)}>number</Button> */}
   <Button onClick={() => console.log(pupils)}>pupils</Button>

   </>
  )
}

export default ObjectsFilter


