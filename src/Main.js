import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateData, DeleteData, ReadData, UpdateData } from './api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil'
import { isLogin} from "./store"


const Main = () => {
    const [todo, setTodo] = useState({ title: '' });
    const [editTodo, setEditTodo] = useState({ title: '' });
    const [targetId, setTargetId] = useState(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [login, setLogin] = useRecoilState(isLogin)

    // 유즈 쿼리, 데이터를 읽기만
    const { data: isData, isLoading, isError, isSuccess } = useQuery(['todos'], ReadData, {
      refetchOnWindowFocus: false,
      onSuccess: (temp) => {
        console.log('data', temp);
      },
      onError: (temp)=> {
        console.log('data', temp)
      },
    });
console.log(isLoading, isError, isSuccess)
    if(isData!==undefined){
    console.log("머리 data", isData)
    }

    // 데이터 쓰기
    const { mutate: AddMutate } = useMutation(CreateData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    });

    // 데이터 삭제
    const { mutate: DeleteMutate } = useMutation(DeleteData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    });
    // 데이터 수정
    const { mutate: UpdateMutate } = useMutation(UpdateData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    });
    // Create mutate
    const onAddData = (todo) => {
      AddMutate(todo);
    };
    // Delete mutate
    const onDeleteData = (todoId) => {
      DeleteMutate(todoId);
    };
    // Update mutate
    const onUpdateData = (todoId, editData) => {
      UpdateMutate({ todoId, editData });
    };

    return(
        <div>
            <button
                onClick={() => {
                navigate('/test');
                }}
            >
                test
            </button>
            {login}
            <form
                onSubmit={(event) => {
                event.preventDefault();
                onAddData(todo);
                }}
            >
                <input
                type='text'
                onChange={(event) => {
                    const { value } = event.target;
                    setTodo({ ...todo, title: value });
                }}
                />
                <button>추가하기</button>
                <div>
                <input
                    type='text'
                    placeholder='수정하고싶은 ID'
                    onChange={(event) => {
                    setTargetId(event.target.value);
                    }}
                />
                <input
                    type='text'
                    placeholder='수정값 입력'
                    onChange={(event) => {
                    setEditTodo({
                        ...editTodo,
                        title: event.target.value,
                    });
                    }}
                />
                <button
                    type='button'
                    onClick={() => {
                    onUpdateData(targetId, editTodo);
                    }}
                >
                    수정하기
                </button>
                </div>
            </form>
            <div>
                {isData?.map((todo) => (
                <div key={todo.id}>
                    {todo.id} : {todo.title}
                    <button
                    onClick={() => {
                        onDeleteData(todo.id);
                    }}
                    >
                    삭제하기
                    </button>
                </div>
                ))}
            </div>
        </div>
        );
}

export default Main