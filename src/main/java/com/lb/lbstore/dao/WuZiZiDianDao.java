/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

@Repository
public class WuZiZiDianDao extends BaseDao {

    public boolean calcXhggSL(HashMap map) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "update wuzixhgg x, (select sum(kc.syl) as sl,kc.xhgg_id as xhgg_id from kucun kc where kc.qy_id=? and kc.wzzd_id=? group by kc.xhgg_id) s "
                    + "set x.sl= s.sl where x.wzzd_id=? and x.id=s.xhgg_id";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, map.get("qy_id"));
            navtiveSQL.setParameter(1, map.get("wzzd_id"));
            navtiveSQL.setParameter(2, map.get("wzzd_id"));
            navtiveSQL.executeUpdate();
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

    public boolean existWuZiZiDian(Integer qy_id, Integer id, String mc, String bm) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        String sql = "";
        if (id > -1) {
            sql = "select 1 from wuzizidian where qy_id=? and id!=? and (mc =? or bm=?)";
            parameters.add(id);
            parameters.add(mc);
            parameters.add(bm);
        } else {
            sql = "select 1 from wuzizidian where qy_id=? and (mc =? or bm=?)";
            parameters.add(mc);
            parameters.add(bm);
        }
        List list = this.getSqlResult(sql, parameters.toArray());
        return !list.isEmpty();
    }

}
