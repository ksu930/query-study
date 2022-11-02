import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import { isLogin, text } from "./store"

const Test = () => {
    const navigate = useNavigate();

    const [value, setValue] = useRecoilState(isLogin);

    return(
        <>
        <button
        onClick={() => {
          navigate('/');
        }}
      >
        main
      </button>
      <div>{value} </div>
      </>
    )
}

export default Test