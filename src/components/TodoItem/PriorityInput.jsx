import styled from "styled-components";
import {useUpdateTodoItem} from "../../data/hooks/useData";

const Input = styled.select`
    font-size: 16px;
    width: 40px;
    border: solid 1px gray;
    border-radius: 15%;
    height: 20px;
    background-color: #F6F6F6;
`;

export const PriorityInput = ({id, checked, priority, setPriorityForNewTask, setColor}) => {
    const { mutate } = useUpdateTodoItem();

    const onValueChanged = (e) => {
        if (setPriorityForNewTask) {
            setPriorityForNewTask(e.target.value);
        }

        if (setColor) {
            setColor(255 / e.target.value);
        }
        
        mutate({ id, checked, priority: e.target.value });
    };

    return (
        <Input value={priority} onChange={onValueChanged} >
            {
                [1, 2, 3, 4, 5].map(num =>
                    <option key={num} value={num}>
                        {num}
                    </option>
                )
            }
        </Input>
    );
};