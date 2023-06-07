import 'bootstrap/dist/css/bootstrap.min.css';

function Cards({ icon, title }) {
  return (
    <div className='card-body' style={{width:"220px",height:"250px,", margin:"0 30px"}}>
      <div className='image'>
        <img src={icon} alt="icon" />
      </div>
      <div className='card-textt'>
        <p style={{textAlign:"center"}}>{title}</p>
        <p style={{textAlign:"center"}}>A small river named Duren flows by their place and supplies</p>
      </div>
    </div>
  );
}

export default Cards;