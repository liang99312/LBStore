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
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jane
 */
@Repository
public class TongJiDao extends BaseDao {

    public List tjFaHuo(HashMap map) {
        List result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select kh.mc as khmc,sum(fh.sl) as sl,sum(fh.je) as je,sum(fh.yfje) as yfje,sum(fh.dfje) as dfje "
                    + "from fahuo fh left join kehu kh on fh.kh_id=kh.id "
                    + "where fh.qy_id=? and fh.state = 1 ";
            if (map.containsKey("ck_id")) {
                sql += " and fh.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and fh.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and fh.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and fh.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            sql += " group by fh.kh_id";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addScalar("khmc", StandardBasicTypes.STRING).addScalar("sl", StandardBasicTypes.DOUBLE).addScalar("je", StandardBasicTypes.DOUBLE).addScalar("yfje", StandardBasicTypes.DOUBLE).addScalar("dfje", StandardBasicTypes.DOUBLE);
            result = navtiveSQL.list();
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

    public List tjFaHuoDetail(HashMap map) {
        List result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select kh.mc,fhd.wzbm,fhd.wzmc,fhd.xhgg,fhd.sl as sl,fh.sj as sj "
                    + "from fahuodetail fhd left join kehu kh on fhd.kh_id=kh.id left join fahuo fh on fhd.fh_id=fh.id "
                    + "where fh.qy_id=? and fh.state = 1 ";
            if (map.containsKey("ck_id")) {
                sql += " and fh.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and fh.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and fh.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and fh.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            sql += " order by fh.kh_id,fh.sj";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addScalar("khmc", StandardBasicTypes.STRING).addScalar("sl", StandardBasicTypes.DOUBLE).addScalar("je", StandardBasicTypes.DOUBLE).addScalar("yfje", StandardBasicTypes.DOUBLE).addScalar("dfje", StandardBasicTypes.DOUBLE);
            result = navtiveSQL.list();
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

    public List tjRuKu(HashMap map) {
        List result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            if ("客户".equals(map.get("type"))) {
                String sql = "select kh.mc as khmc,sum(rk.sl) as sl,sum(rk.je) as je,sum(rk.yfje) as yfje,sum(rk.dfje) as dfje "
                        + "from ruku rk left join kehu kh on rk.kh_id=kh.id "
                        + "where rk.qy_id=? and rk.state = 1 and rk.kh_id > 0 ";
                if (map.containsKey("ck_id")) {
                    sql += " and rk.ck_id = ?";
                    parameters.add(map.get("ck_id"));
                }
                if (map.containsKey("kh_id")) {
                    sql += " and rk.kh_id = ?";
                    parameters.add(map.get("kh_id"));
                }
                if (map.containsKey("qrq")) {
                    sql += " and rk.sj >= ?";
                    parameters.add(map.get("qrq"));
                }
                if (map.containsKey("zrq")) {
                    sql += " and rk.sj <= ?";
                    parameters.add(map.get("zrq") + " 23:59:59");
                }
                sql += " group by rk.kh_id";
                SQLQuery navtiveSQL = session.createSQLQuery(sql);
                for (int i = 0; i < parameters.size(); i++) {
                    navtiveSQL.setParameter(i, parameters.get(i));
                }
                navtiveSQL.addScalar("khmc", StandardBasicTypes.STRING).addScalar("sl", StandardBasicTypes.DOUBLE).addScalar("je", StandardBasicTypes.DOUBLE).addScalar("yfje", StandardBasicTypes.DOUBLE).addScalar("dfje", StandardBasicTypes.DOUBLE);
                result = navtiveSQL.list();
            } else {
                String sql = "select gys.mc as gysmc,sum(rk.sl) as sl,sum(rk.je) as je,sum(rk.yfje) as yfje,sum(rk.dfje) as dfje "
                        + "from ruku rk left join gongyingshang gys on rk.gys_id=gys.id "
                        + "where rk.qy_id=? and rk.state = 1 and rk.gys_id > 0 ";
                if (map.containsKey("ck_id")) {
                    sql += " and rk.ck_id = ?";
                    parameters.add(map.get("ck_id"));
                }
                if (map.containsKey("gys_id")) {
                    sql += " and rk.gys_id = ?";
                    parameters.add(map.get("gys_id"));
                }
                if (map.containsKey("qrq")) {
                    sql += " and rk.sj >= ?";
                    parameters.add(map.get("qrq"));
                }
                if (map.containsKey("zrq")) {
                    sql += " and rk.sj <= ?";
                    parameters.add(map.get("zrq") + " 23:59:59");
                }
                sql += " group by rk.gys_id";
                SQLQuery navtiveSQL = session.createSQLQuery(sql);
                for (int i = 0; i < parameters.size(); i++) {
                    navtiveSQL.setParameter(i, parameters.get(i));
                }
                navtiveSQL.addScalar("gysmc", StandardBasicTypes.STRING).addScalar("sl", StandardBasicTypes.DOUBLE).addScalar("je", StandardBasicTypes.DOUBLE).addScalar("yfje", StandardBasicTypes.DOUBLE).addScalar("dfje", StandardBasicTypes.DOUBLE);
                result = navtiveSQL.list();
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
