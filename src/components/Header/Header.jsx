import { Menu } from '@mui/icons-material';
import './Header.scss';

function Header({ navBartitle, mainTitle, isVisibleMenuIcon }) {

    return (
        <div>
            <div className="header">
                <div className="icon-wrapper">
                    {isVisibleMenuIcon &&
                        <Menu className="icon" />
                    }
                </div>

                {navBartitle &&
                    <div className='nav-title-wrapper'>
                        <label>{navBartitle}</label>
                    </div>
                }
            </div>
            <div className="sub-header">
                <label>{mainTitle}</label>
            </div>
        </div>
    );
}

export default Header;