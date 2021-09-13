function Header() {
  return (
    <header>
      <div className="container">
        <h1>Welcome to BKblog</h1>
        <p style={{ marginBottom: 0 }}>
          This web site is an open source blog website. Created by Burhan Kocadağ
          {" "}
        </p>{" "}

      </div>
      <img alt="" src='https://i.ibb.co/KFBZ2L3/profile.jpg' className="header-img"/>
      <div className="imgbg"></div>
    </header>
  );
}
export default Header