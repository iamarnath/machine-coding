import React,{useState,useEffect} from 'react';

const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
];

const Checkboxes = ({data,checked,setChecked}) =>{
    const handleChange = (isChecked,node) =>{
        setChecked((prev)=>{
            const newState = {...prev,[node.id]:isChecked};
            // update all children of parent node with checked and unchecked state
            const updateChildren = (node)=>{
                if(node.children){
                    node.children.forEach(child => {
                        newState[child.id] = isChecked;
                        updateChildren(child);
                    });
                }
            }
            //update parent when child is clicked
            const updateParents = (node,data) =>{
                //first find parent node
                const findParent = (nodeId,tree)=>{
                    for(const item of tree){
                        if(item.children?.some((child)=>child.id === nodeId)){
                            return item;
                        }
                        //console.log("item.children ",item.children)
                        const found = item.children && findParent(nodeId,item.children);
                        if(found) return found;
                    }
                    return null;
                }

                let parent = findParent(node.id,data);
                console.log("parent ",parent);
                while(parent){
                    const allChildrenChecked = parent.children.every(
                        (child)=> newState[child.id]);
                    newState[parent.id] = allChildrenChecked;
                    parent=findParent(parent.id,data);
                }
            };

            updateChildren(node);
            updateParents(node,CheckboxesData);
            return newState;
        });
    }
    return (
        <div>
            {
                data.map((node) =>(
                    <div key={node.id} style={{paddingLeft:"20px"}}>
                        <input 
                            type="checkbox"
                            checked = {checked[node.id] || false}
                            onChange={(e)=>handleChange(e.target.checked,node)}
                            />
                            <span>{node.label}</span>
                            {
                                node.children && (
                                    <Checkboxes
                                    data = {node.children}
                                    checked={checked}
                                    setChecked={setChecked}
                                    />
                                )}
                    </div>
                ))
            }
        </div>
    )
} 

const NestedCheckbox = () =>{
    const [checked,setChecked] = useState({});

    return <div>
        <h1>Nested checkbox</h1>
        <Checkboxes
            data={CheckboxesData}
            checked={checked}
            setChecked={setChecked}
        />

        
        </div>
}

export default NestedCheckbox;