import './Menu.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import clientAction from '../../../redux/clientActionType';

export default function Menu() {
  const dispatch = useDispatch();
  const IsMenu = useSelector((store) => store.menuReducer.menu);
  useEffect(() => {
    const removeMenu = () => {
      window.innerWidth >= 640 &&
        dispatch({ type: clientAction.menu, payload: false });
    };

    // 해당 컴포넌트는 IsMenu가 false일때 JSX가 리턴되지 않지만 컴포넌트 자체는 계속 마운트되어 있는 상태이기 때문에 cleanup함수로 윈도우 객체에 이벤트 핸들러 제거가 불가능하므로 state값에 따라 핸들러 제거
    IsMenu
      ? window.addEventListener('resize', removeMenu)
      : window.removeEventListener('resize', removeMenu);
  }, [IsMenu, dispatch]);
  return (
    <AnimatePresence>
      {IsMenu && (
        <motion.aside
          className="Menu"
          onClick={() => dispatch({ type: clientAction.menu, payload: false })}
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            <Link to="/">DECODELAB ♥</Link>
          </h1>
          <ul>
            <li>
              <NavLink to="/department" activeClassName={'on'}>
                Department
              </NavLink>
            </li>
            <li>
              <NavLink to="/community" activeClassName={'on'}>
                Community
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" activeClassName={'on'}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/youtube" activeClassName={'on'}>
                Youtube
              </NavLink>
            </li>
            <li>
              <NavLink to="/members" activeClassName={'on'}>
                Members
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName={'on'}>
                Contact
              </NavLink>
            </li>
          </ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
