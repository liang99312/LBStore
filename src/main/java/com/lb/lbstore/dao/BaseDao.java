/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Administrator
 */
public abstract class BaseDao {

    @Autowired
    private SessionFactory sessionFactory;

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public Integer save(Object obj) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            result = (Integer) session.save(obj);
            session.flush();
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
            
        }
        return result;
    }

    public boolean update(Object obj) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            session.update(obj);
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean delete(Object obj) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            session.delete(obj);
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean excuteSql(String sql) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            session.createSQLQuery(sql).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean excuteSqls(List<String> sqls) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            for (String sql : sqls) {
                session.createSQLQuery(sql).executeUpdate();
                session.flush();
            }
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public List getSqlResult(String sql) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        return query.list();
    }

    public List getResult(String hql, Object[] parameters) {
        Query query = sessionFactory.getCurrentSession().createQuery(hql);
        if (parameters != null && parameters.length > 0) {
            for (int i = 0; i < parameters.length; i++) {
                query.setParameter(i, parameters[i]);
            }
        }
        return query.list();
    }

    public int getCount(String hql, Object[] parameters) {
        Query query = sessionFactory.getCurrentSession().createSQLQuery(hql);
        if (parameters != null && parameters.length > 0) {
            for (int i = 0; i < parameters.length; i++) {
                query.setParameter(i, parameters[i]);
            }
        }
        List list = query.list();
        if (list == null || list.isEmpty() || list.get(0) == null) {
            return 0;
        }
        return Integer.valueOf(list.get(0).toString());
    }

    public List getPageList(String hql, Object[] parameters, int pageNow, int pageSize) {
        int b_row = (pageNow - 1) * pageSize;
        Query query = sessionFactory.getCurrentSession().createQuery(hql);
        if (parameters != null && parameters.length > 0) {
            for (int i = 0; i < parameters.length; i++) {
                query.setParameter(i, parameters[i]);
            }
        }
        query.setFirstResult(b_row);
        query.setMaxResults(pageSize);
        return query.list();
    }

    public List getPageListBySql(String sql, Object[] parameters, int pageNow, int pageSize) {
        int b_row = (pageNow - 1) * pageSize;
        Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        if (parameters != null && parameters.length > 0) {
            for (int i = 0; i < parameters.length; i++) {
                query.setParameter(i, parameters[i]);
            }
        }
        query.setFirstResult(b_row);
        query.setMaxResults(pageSize);
        return query.list();
    }

    public boolean updateObjects(List updateList) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            for (Object obj : updateList) {
                session.update(obj);
                session.flush();
            }
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public boolean saveObjects(List addList) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = sessionFactory.openSession();
            tx = session.beginTransaction();
            for (Object obj : addList) {
                session.save(obj);
                session.flush();
            }
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public Object findObjectById(Class c, Serializable id) {
        Object result = null;
        Session session = null;
        try {
            session = sessionFactory.openSession();
            result = session.load(c, id);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public Map<String,Object> getPages(String sql, int pageNow) {
        Map<String,Object> result = new HashMap<String,Object>();
        int total = getCount("select count(1) " + sql, null);
        int zys = (total - 1) / 20 + 1;
        result.put("zys", zys);
        result.put("yx", pageNow);
        result.put("jls", total);
        return result;
    }
    
    public boolean deleteObjById(String tblName,int id){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = this.sessionFactory.openSession();
            tx = session.beginTransaction();
            session.createSQLQuery("delete from "+tblName+" where id=" + id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

}
