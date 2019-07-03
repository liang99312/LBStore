/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.XuQiu;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class XuQiuDao extends BaseDao {
    
    public List<XuQiu> queryLingLiaosByPage(HashMap map) {
        List<XuQiu> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {xq.*},kh.mc as khmc from XuQiu xq "
                    + "left join KeHu kh on xq.kh_id=kh.id "
                    + "where xq.qy_id=?";
            if (map.containsKey("kh_id")) {
                sql += " and xq.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("mc")) {
                sql += " and xq.mc like ?";
                parameters.add("%" + map.get("mc") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and xq.state = ?";
                parameters.add(map.get("state"));
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("xq", XuQiu.class).addScalar("khmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                XuQiu xq = (XuQiu) objs[0];
                String khmc = (String) objs[1];
                xq.setKhmc(khmc);
                result.add(xq);
            }
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

    public boolean existXuQiu(Integer qy_id, Integer id, String mc, Integer kh_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        String sql = "";
        if (id > -1) {
            sql = "select 1 from xuqiu where qy_id=? and id!=? and mc =? and kh_id=?";
            parameters.add(id);
            parameters.add(mc);
            parameters.add(kh_id);
        } else {
            sql = "select 1 from xuqiu where qy_id=? and mc =? and kh_id=?";
            parameters.add(mc);
            parameters.add(kh_id);
        }
        List list = this.getSqlResult(sql, parameters.toArray());
        return !list.isEmpty();
    }
}
