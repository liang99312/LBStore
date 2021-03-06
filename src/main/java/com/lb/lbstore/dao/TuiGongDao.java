/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.TuiGong;
import com.lb.lbstore.domain.TuiGongDetail;
import com.lb.lbstore.domain.TuiGongFei;
import com.lb.lbstore.util.LshUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class TuiGongDao extends BaseDao {

    public TuiGong getTuiGongDetailById(Integer id) {
        TuiGong tuiGong = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {tg.*},ck.mc as ckmc,a01.mc as tgrmc,a02.mc as sprmc,gys.mc as gysmc,kh.mc as khmc from TuiGong tg "
                    + "left join CangKu ck on tg.ck_id=ck.id "
                    + "left join A01 a01 on tg.tgr_id=a01.id "
                    + "left join A01 a02 on tg.spr_id=a02.id "
                    + "left join GongYingShang gys on tg.gys_id=gys.id "
                    + "left join KeHu kh on tg.kh_id=kh.id "
                    + "where tg.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("tg", TuiGong.class)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("tgrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING)
                    .addScalar("gysmc", StandardBasicTypes.STRING)
                    .addScalar("khmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<TuiGong> list_tg = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                TuiGong tg = (TuiGong) objs[0];
                String ckmc = (String) objs[1];
                String tgrmc = (String) objs[2];
                String sprmc = (String) objs[3];
                String gysmc = (String) objs[4];
                String khmc = (String) objs[5];
                tg.setCkmc(ckmc);
                tg.setTgrmc(tgrmc);
                tg.setSprmc(sprmc);
                tg.setGysmc(gysmc);
                tg.setKhmc(khmc);
                list_tg.add(tg);
            }
            if (list_tg.isEmpty()) {
                return null;
            }
            tuiGong = list_tg.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from TuiGongDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.tg_id=?";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, id);
            navtiveSQL_d.addEntity("d", TuiGongDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<TuiGongDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                TuiGongDetail tgd = (TuiGongDetail) objs[0];
                String wzlb = (String) objs[1];
                tgd.setWzlb(wzlb);
                details.add(tgd);
            }
            tuiGong.setDetails(details);
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
        return tuiGong;
    }

    public List<TuiGong> queryTuiGongsByPage(HashMap map) {
        List<TuiGong> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {tg.*},ck.mc as ckmc,gys.mc as gysmc,kh.mc as khmc from TuiGong tg "
                    + "left join CangKu ck on tg.ck_id=ck.id "
                    + "left join GongYingShang gys on tg.gys_id=gys.id "
                    + "left join KeHu kh on tg.kh_id=kh.id "
                    + "where tg.qy_id=?";
            if (map.containsKey("ck_id")) {
                sql += " and tg.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("lsh")) {
                sql += " and tg.lsh like ?";
                parameters.add("%" + map.get("lsh") + "%");
            }
            if (map.containsKey("wz")) {
                sql += " and tg.wz like ?";
                parameters.add("%" + map.get("wz") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and tg.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and tg.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("gys_id")) {
                sql += " and tg.gys_id = ?";
                parameters.add(map.get("gys_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and tg.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and tg.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("tg", TuiGong.class).addScalar("ckmc", StandardBasicTypes.STRING).addScalar("gysmc", StandardBasicTypes.STRING).addScalar("khmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                TuiGong tg = (TuiGong) objs[0];
                String ckmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String khmc = (String) objs[3];
                tg.setCkmc(ckmc);
                tg.setGysmc(gysmc);
                tg.setKhmc(khmc);
                result.add(tg);
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

    public Integer saveTuiGong(TuiGong tuiGong) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            tuiGong.setDfje(tuiGong.getJe() - tuiGong.getYfje());
            Integer id = (Integer) session.save(tuiGong);
            session.flush();
            for (TuiGongDetail detail : tuiGong.getDetails()) {
                detail.setCk_id(tuiGong.getCk_id());
                detail.setQy_id(tuiGong.getQy_id());
                detail.setTg_id(id);
                detail.setDh(tuiGong.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setTgzl(detail.getTgl());
                }
                session.save(detail);
            }
            session.flush();
            tx.commit();
            result = id;
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

    public boolean updateTuiGong(TuiGong tuiGong) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            tuiGong.setDfje(tuiGong.getJe() - tuiGong.getYfje());
            session.update(tuiGong);
            session.flush();
            String deleteDetail = "delete from TuiGongDetail where tg_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, tuiGong.getId()).executeUpdate();
            session.flush();
            for (TuiGongDetail detail : tuiGong.getDetails()) {
                detail.setCk_id(tuiGong.getCk_id());
                detail.setQy_id(tuiGong.getQy_id());
                detail.setTg_id(tuiGong.getId());
                session.save(detail);
            }
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

    public boolean deleteTuiGong(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from TuiGongDetail where tg_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, id).executeUpdate();
            String deleteFei = "delete from TuiGongFei where tg_id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            String deleteLl = "delete from TuiGong where id=?";
            session.createSQLQuery(deleteLl).setParameter(0, id).executeUpdate();
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

    public String dealTuiGong(TuiGong tuiGong, Integer a01_id) {
        String result = "1";
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from TuiGongDetail where tg_id=?";
            List<TuiGongDetail> list = session.createQuery(sql).setParameter(0, tuiGong.getId()).list();
            Hashtable<Integer, TuiGongDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            Hashtable<Integer, TuiGongDetail> LlDetailTable = new Hashtable();
            StringBuilder llSb = new StringBuilder();
            llSb.append("(-1");
            for (TuiGongDetail e : tuiGong.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());

                LlDetailTable.put(e.getRkd_id(), e);
                llSb.append(",");
                llSb.append(e.getRkd_id());
            }
            sb.append(")");
            llSb.append(")");

//            String lldString = "select lld.id as id, lld.slzl-h.zl as sl from lingliaodetail lld, "
//                    + "(select sum(tgd.tgzl) as zl,tgd.lld_id as lld_id from tuigongdetail tgd,tuigong tg where tgd.tg_id=tg.id and tg.state=1 and tgd.lld_id in " + llSb + " group by tgd.lld_id) as h "
//                    + "where lld.id=h.lld_id;";
//            List lldList = session.createSQLQuery(lldString).list();
//            for (Object obj : lldList) {
//                Object[] objs = (Object[]) obj;
//                Integer lld_id = (Integer) objs[0];
//                Double sl = (Double) objs[1];
//                TuiGongDetail detail = LlDetailTable.get(lld_id);
//                if (detail != null) {
//                    if (sl < detail.getTgzl()) {
//                        result = "退供数量不能大于领料数量！";
//                        tx.rollback();
//                        return result;
//                    }
//                }
//            }
            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                TuiGongDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if (kc.getSyzl() < detail.getTgzl()) {
                        tx.rollback();
                        result = "库存数量对不上";
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() - detail.getTgzl());
                    kc.setSyl(kc.getSyl() - detail.getTgl());
                    if (detail.getDymx() != null && !"".equals(detail.getDymx())) {
                        JSONArray detailDymx = JSONArray.parseArray(detail.getDymx());
                        JSONArray kcDymx = JSONArray.parseArray(kc.getDymx());
                        List<Integer> dxIds = new ArrayList();
                        for (int i = 0; i < detailDymx.size(); i++) {
                            JSONObject d = detailDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            dxIds.add(d.getIntValue("id"));
                        }
                        for (int i = 0; i < kcDymx.size(); i++) {
                            JSONObject k = kcDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            int id = k.getIntValue("id");
                            if (dxIds.contains(id)) {
                                k.remove("state");
                                k.put("state", 1);
                            }
                        }
                        kc.setDymx(kcDymx.toJSONString());
                    }
                    //处理库存
                    session.save(kc);
                }
            }
            session.flush();
            tuiGong = (TuiGong) session.load(TuiGong.class, tuiGong.getId());
            tuiGong.setState(1);
            tuiGong.setSpr_id(a01_id);
            tuiGong.setSpsj(new Date());
            tuiGong.setLsh(LshUtil.getTgdLsh());
            session.update(tuiGong);
            session.flush();
            tx.commit();
            result = "1";
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

    public List<TuiGongFei> queryTuiGongFeisByPage(HashMap map) {
        List<TuiGongFei> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {thf.*},a01.mc as skrmc from TuiGongFei thf "
                    + "left join A01 a01 on thf.skr_id=a01.id "
                    + "where thf.tg_id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, map.get("tg_id"));
            navtiveSQL.addEntity("thf", TuiGongFei.class).addScalar("skrmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                TuiGongFei thf = (TuiGongFei) objs[0];
                String skrmc = (String) objs[1];
                thf.setSkrmc(skrmc);
                result.add(thf);
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

    public boolean deleteTuiGongFei(Integer id, Integer tg_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteFei = "delete from TuiGongFei where id=?";
            session.createSQLQuery(deleteFei).setParameter(0,id).executeUpdate();
            session.flush();
            String updateTuiGong = "update tuigong set yfje = ifnull((select sum(ifnull(f.je,0)) from tuigongfei f where f.tg_id = ?),0) where tuigong.id=?";
            session.createSQLQuery(updateTuiGong).setParameter(0, tg_id).setParameter(1, tg_id).executeUpdate();
            session.flush();
            updateTuiGong = "update tuigong set dfje = je - yfje where id=?";
            session.createSQLQuery(updateTuiGong).setParameter(0, tg_id).executeUpdate();
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

    public Integer saveTuiGongFei(TuiGongFei tuiGongFei) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(tuiGongFei);
            session.flush();
            int tg_id = tuiGongFei.getTg_id();
            String updateTuiGong = "update tuigong set yfje = ifnull((select sum(ifnull(f.je,0)) from tuigongfei f where f.tg_id = ?),0) where tuigong.id=?";
            session.createSQLQuery(updateTuiGong).setParameter(0, tg_id).setParameter(1, tg_id).executeUpdate();
            session.flush();
            updateTuiGong = "update tuigong set dfje = je - yfje where id=?";
            session.createSQLQuery(updateTuiGong).setParameter(0, tg_id).executeUpdate();
            session.flush();
            tx.commit();
            result = id;
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

    public boolean updateTuiGongFei(TuiGongFei tuiGongFei) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(tuiGongFei);
            session.flush();
            int tg_id = tuiGongFei.getTg_id();
            String updateTuiGong = "update tuigong set yfje = ifnull((select sum(ifnull(f.je,0)) from tuigongfei f where f.tg_id = ?),0) where tuigong.id=?";
            session.createSQLQuery(updateTuiGong).setParameter(0, tg_id).setParameter(1, tg_id).executeUpdate();
            session.flush();
            updateTuiGong = "update tuigong set dfje = je - yfje where id=?";
            session.createSQLQuery(updateTuiGong).setParameter(0, tg_id).executeUpdate();
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
