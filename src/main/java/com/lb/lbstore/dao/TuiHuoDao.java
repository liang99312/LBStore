/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lb.lbstore.domain.TuiHuoFei;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.TuiHuo;
import com.lb.lbstore.domain.TuiHuoDetail;
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
public class TuiHuoDao extends BaseDao {

    public TuiHuo getTuiHuoDetailById(Integer id) {
        TuiHuo tuiHuo = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {th.*},ck.mc as ckmc,a01.mc as thrmc,a02.mc as sprmc,kh.mc as khmc from TuiHuo th "
                    + "left join CangKu ck on th.ck_id=ck.id "
                    + "left join A01 a01 on th.thr_id=a01.id "
                    + "left join A01 a02 on th.spr_id=a02.id "
                    + "left join KeHu kh on th.kh_id=kh.id "
                    + "where th.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("th", TuiHuo.class)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("thrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING)
                    .addScalar("khmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<TuiHuo> list_th = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                TuiHuo th = (TuiHuo) objs[0];
                String ckmc = (String) objs[1];
                String thrmc = (String) objs[2];
                String sprmc = (String) objs[3];
                String khmc = (String) objs[4];
                th.setCkmc(ckmc);
                th.setThrmc(thrmc);
                th.setSprmc(sprmc);
                th.setKhmc(khmc);
                list_th.add(th);
            }
            if (list_th.isEmpty()) {
                return null;
            }
            tuiHuo = list_th.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from TuiHuoDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.th_id=?";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, id);
            navtiveSQL_d.addEntity("d", TuiHuoDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<TuiHuoDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                TuiHuoDetail thd = (TuiHuoDetail) objs[0];
                String wzlb = (String) objs[1];
                thd.setWzlb(wzlb);
                details.add(thd);
            }
            tuiHuo.setDetails(details);
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
        return tuiHuo;
    }

    public List<TuiHuo> queryTuiHuosByPage(HashMap map) {
        List<TuiHuo> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {th.*},ck.mc as ckmc,kh.mc as khmc from TuiHuo th "
                    + "left join CangKu ck on th.ck_id=ck.id "
                    + "left join KeHu kh on th.kh_id=kh.id "
                    + "where th.qy_id=?";
            if (map.containsKey("ck_id")) {
                sql += " and th.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("lsh")) {
                sql += " and th.lsh like ?";
                parameters.add("%" + map.get("lsh") + "%");
            }
            if (map.containsKey("wz")) {
                sql += " and th.wz like ?";
                parameters.add("%" + map.get("wz") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and th.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and th.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and th.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and th.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("th", TuiHuo.class).addScalar("ckmc", StandardBasicTypes.STRING).addScalar("khmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                TuiHuo th = (TuiHuo) objs[0];
                String ckmc = (String) objs[1];
                String khmc = (String) objs[2];
                th.setCkmc(ckmc);
                th.setKhmc(khmc);
                result.add(th);
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

    public Integer saveTuiHuo(TuiHuo tuiHuo) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            tuiHuo.setDfje(tuiHuo.getJe() - tuiHuo.getYfje());
            Integer id = (Integer) session.save(tuiHuo);
            session.flush();
            for (TuiHuoDetail detail : tuiHuo.getDetails()) {
                detail.setCk_id(tuiHuo.getCk_id());
                detail.setQy_id(tuiHuo.getQy_id());
                detail.setTh_id(id);
                detail.setDh(tuiHuo.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setThzl(detail.getThl());
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

    public boolean updateTuiHuo(TuiHuo tuiHuo) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            tuiHuo.setDfje(tuiHuo.getJe() - tuiHuo.getYfje());
            session.update(tuiHuo);
            session.flush();
            String deleteDetail = "delete from TuiHuoDetail where th_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, tuiHuo.getId()).executeUpdate();
            session.flush();
            for (TuiHuoDetail detail : tuiHuo.getDetails()) {
                detail.setCk_id(tuiHuo.getCk_id());
                detail.setQy_id(tuiHuo.getQy_id());
                detail.setTh_id(tuiHuo.getId());
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

    public boolean deleteTuiHuo(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from TuiHuoDetail where th_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, id).executeUpdate();
            String deleteFei = "delete from TuiHuoFei where th_id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            String deleteLl = "delete from TuiHuo where id=?";
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

    public String dealTuiHuo(TuiHuo tuiHuo, Integer a01_id) {
        String result = "1";
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from TuiHuoDetail where th_id=?";
            List<TuiHuoDetail> list = session.createQuery(sql).setParameter(0, tuiHuo.getId()).list();
            Hashtable<Integer, TuiHuoDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            Hashtable<Integer, TuiHuoDetail> LlDetailTable = new Hashtable();
            StringBuilder llSb = new StringBuilder();
            llSb.append("(-1");
            for (TuiHuoDetail e : tuiHuo.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());

                LlDetailTable.put(e.getFhd_id(), e);
                llSb.append(",");
                llSb.append(e.getFhd_id());
            }
            sb.append(")");
            llSb.append(")");

            String fhdString = "select fhd.id as id, fhd.fhzl-ifnull(h.zl,0) as sl from fahuodetail fhd, "
                    + "(select sum(ifnull(thd.thzl,0)) as zl,thd.fhd_id as fhd_id from tuihuodetail thd,tuihuo th where thd.th_id=th.id and th.state=1 and thd.fhd_id in " + llSb + " group by thd.fhd_id) as h "
                    + "where fhd.id=h.fhd_id;";
            List fhdList = session.createSQLQuery(fhdString).list();
            for (Object obj : fhdList) {
                Object[] objs = (Object[]) obj;
                Integer fhd_id = (Integer) objs[0];
                Double sl = (Double) objs[1];
                TuiHuoDetail detail = LlDetailTable.get(fhd_id);
                if (detail != null) {
                    if (sl < detail.getThzl()) {
                        result = "退货数量不能大于发货数量！";
                        tx.rollback();
                        return result;
                    }
                }
            }

            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                TuiHuoDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if ((kc.getZl() - kc.getSyzl()) < detail.getThzl()) {
                        tx.rollback();
                        result = "0";
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() + detail.getThzl());
                    kc.setSyl(kc.getSyl() + detail.getThl());
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
                                k.put("state", 0);
                            }
                        }
                        kc.setDymx(kcDymx.toJSONString());
                    }
                    //处理库存
                    session.save(kc);
                }
            }
            session.flush();
            tuiHuo = (TuiHuo) session.load(TuiHuo.class, tuiHuo.getId());
            tuiHuo.setState(1);
            tuiHuo.setSpr_id(a01_id);
            tuiHuo.setSpsj(new Date());
            tuiHuo.setLsh(LshUtil.getThdLsh());
            session.update(tuiHuo);
            session.flush();
            tx.commit();
            result = "1";
        } catch (Exception e) {
            tx.rollback();
            e.printStackTrace();
            result = "处理错误：" + e.getMessage();
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

    public List<TuiHuoFei> queryTuiHuoFeisByPage(HashMap map) {
        List<TuiHuoFei> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {thf.*},a01.mc as skrmc from TuiHuoFei thf "
                    + "left join A01 a01 on thf.skr_id=a01.id "
                    + "where thf.th_id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, map.get("th_id"));
            navtiveSQL.addEntity("thf", TuiHuoFei.class).addScalar("skrmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                TuiHuoFei thf = (TuiHuoFei) objs[0];
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

    public boolean deleteTuiHuoFei(Integer id, Integer th_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteFei = "delete from TuiHuoFei where id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            session.flush();
            String updateTuiHuo = "update tuihuo set yfje = ifnull((select sum(ifnull(f.je,0)) from tuihuofei f where f.th_id = ?),0) where tuihuo.id=?";
            session.createSQLQuery(updateTuiHuo).setParameter(0, th_id).setParameter(1, th_id).executeUpdate();
            session.flush();
            updateTuiHuo = "update tuihuo set dfje = je - yfje where id=?";
            session.createSQLQuery(updateTuiHuo).setParameter(0, th_id).executeUpdate();
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

    public Integer saveTuiHuoFei(TuiHuoFei tuiHuoFei) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(tuiHuoFei);
            session.flush();
            int th_id = tuiHuoFei.getTh_id();
            String updateTuiHuo = "update tuihuo set yfje = ifnull((select sum(ifnull(f.je,0)) from tuihuofei f where f.th_id = ?),0) where tuihuo.id=?";
            session.createSQLQuery(updateTuiHuo).setParameter(0, th_id).setParameter(1, th_id).executeUpdate();
            session.flush();
            updateTuiHuo = "update tuihuo set dfje = je - yfje where id=?";
            session.createSQLQuery(updateTuiHuo).setParameter(0, th_id).executeUpdate();
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

    public boolean updateTuiHuoFei(TuiHuoFei tuiHuoFei) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(tuiHuoFei);
            session.flush();
            int th_id = tuiHuoFei.getTh_id();
            String updateTuiHuo = "update tuihuo set yfje = ifnull((select sum(ifnull(f.je,0)) from tuihuofei f where f.th_id = ?),0) where tuihuo.id=?";
            session.createSQLQuery(updateTuiHuo).setParameter(0, th_id).setParameter(1, th_id).executeUpdate();
            session.flush();
            updateTuiHuo = "update tuihuo set dfje = je - yfje where id=?";
            session.createSQLQuery(updateTuiHuo).setParameter(0, th_id).executeUpdate();
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
