//const pool = require('../db');
const supabase = require('../client.js');

const getTables = async (req, res) => {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
  };

  const getTestTable = async (req, res) => {
    const { data, error } = await supabase
      .from('test')
      .select('*');
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(data);
    }
  };

const getUsers = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


  const createUser = async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const {user, session, error} = await supabase.auth.signUp({
            email: username,
            password: password
        });

        if (error) {
            throw new Error(error.message);
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const findUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data: user, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      next(error);
    }
  };  

module.exports = {
    getTables,
    getTestTable,
    getUsers,
    createUser,
    findUser,
}