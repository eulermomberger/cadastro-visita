import './styles.css';

import { MdAccountCircle } from 'react-icons/md';

export function VisitorsList({ visitors }) {
  if (visitors.length > 0) {
    return (
      <div className='list-container'>
        <div className='list-header'>
          <span className='list-icon'></span>
          <span className='list-name'>Nome</span>
          <span className='list-rg'>RG</span>
          <span className='list-date'>Data de modificação</span>
        </div>
        <div className='list-body'>
          {visitors.map((visitor) => (
            <div key={visitor.uuid} className='list-visitor-row'>
              <div className='list-icon'>
                <MdAccountCircle
                  color='#FFF'
                  size={36}
                />
              </div>
              <div className='list-name'>
                {visitor.name}
              </div>
              <div className='list-rg'>
                {visitor.rg}
              </div>
              <div className='list-date'>
                {visitor.updated_at.toDate().toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className='list-empty'>
        Nenhum visitante encontrado
      </div>
    );
  }
}
