/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.XiangMuDetail;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class XiangMuDetailDao extends BaseDao {
    
    public List<XiangMuDetail> queryXiangMuDetailsByState(Integer state,Integer qy_id){
        List<XiangMuDetail> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(qy_id);
            parameters.add(state);
            session = getSessionFactory().openSession();
            String sql = "select {xmd.*},kh.mc as khmc,xm.mc as xmmc,xm.lsh as xmlsh from XiangMuDetail xmd "
                    + "left join XiangMu xm on xmd.xm_id=xm.id "
                    + "left join KeHu kh on xmd.kh_id=kh.id "
                    + "where xm.qy_id=? and xmd.state = ?";
            
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("xmd", XiangMuDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("xmmc", StandardBasicTypes.STRING)
                    .addScalar("xmlsh", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                XiangMuDetail xmd = (XiangMuDetail) objs[0];
                xmd.setMc(xmd.getLsh());
                String khmc = (String) objs[1];
                String xmmc = (String) objs[2];
                String xmlsh = (String) objs[3];
                xmd.setKhmc(khmc);
                xmd.setXmmc(xmmc);
                xmd.setXmlsh(xmlsh);
                result.add(xmd);
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

    public List<XiangMuDetail> queryXiangMuDetailsByPage(HashMap map) {
        List<XiangMuDetail> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {xmd.*},kh.mc as khmc,xm.mc as xmmc,xm.lsh as xmlsh from XiangMuDetail xmd "
                    + "left join XiangMu xm on xmd.xm_id=xm.id "
                    + "left join KeHu kh on xmd.kh_id=kh.id "
                    + "where xm.qy_id=?";
            if (map.containsKey("xmmc")) {
                sql += " and xm.mc like ?";
                parameters.add("%" + map.get("xmmc") + "%");
            }
            if (map.containsKey("xmlsh")) {
                sql += " and xm.lsh like ?";
                parameters.add("%" + map.get("xmlsh") + "%");
            }
            if (map.containsKey("lsh")) {
                sql += " and xmd.lsh like ?";
                parameters.add("%" + map.get("lsh") + "%");
            }
            if (map.containsKey("wzmc")) {
                sql += " and xmd.wzmc like ?";
                parameters.add("%" + map.get("wzmc") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and xmd.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and xmd.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and xm.kdsj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and xm.kdsj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("xmd", XiangMuDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("xmmc", StandardBasicTypes.STRING)
                    .addScalar("xmlsh", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                XiangMuDetail xmd = (XiangMuDetail) objs[0];
                String khmc = (String) objs[1];
                String xmmc = (String) objs[2];
                String xmlsh = (String) objs[3];
                xmd.setKhmc(khmc);
                xmd.setXmmc(xmmc);
                xmd.setXmlsh(xmlsh);
                result.add(xmd);
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
}
