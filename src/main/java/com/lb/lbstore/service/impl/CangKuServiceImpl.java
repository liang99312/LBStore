/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.CangKuDao;
import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.CangKu;
import com.lb.lbstore.domain.CangKuA01;
import com.lb.lbstore.domain.KuWei;
import com.lb.lbstore.service.CangKuService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("cangKuServiceImpl")
public class CangKuServiceImpl implements CangKuService {

    @Autowired
    private CangKuDao cangKuDao;

    @Override
    public CangKu getCangKuById(Integer id) {
        String a01Hql = "from A01 where id in(select a01_id from CangKuA01 where ck_id="+id +")";
        String kwHql = "from KuWei where ck_id="+id;
        List<A01> a01s = cangKuDao.getResult(a01Hql, null);
        List<KuWei> kws = cangKuDao.getResult(kwHql, null);
        CangKu ck = (CangKu) cangKuDao.findObjectById(CangKu.class, id);
        ck.setA01s(a01s);
        ck.setKws(kws);
        return ck;
    }

    @Override
    public List<CangKu> getAllCangKus(Integer qy_id) {
        return cangKuDao.getResult("from CangKu cangKu where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateCangKu(CangKu cangKu) {
        return cangKuDao.update(cangKu);
    }

    @Override
    public CangKu saveCangKu(CangKu cangKu) {
        int id = cangKuDao.save(cangKu);
        return (CangKu) cangKuDao.findObjectById(CangKu.class, id);
    }

    @Override
    public boolean deleteCangKu(Integer id) {
        CangKu cangKu = (CangKu) cangKuDao.findObjectById(CangKu.class, id);
        if(cangKu.getState() == 0){
            cangKu.setState(-1);
            return cangKuDao.update(cangKu);
        }else if(cangKu.getState() == -1){
            return cangKuDao.deleteObjById("cangKu", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from CangKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return cangKuDao.getCount(sql, null);
    }

    @Override
    public List<CangKu> queryCangKusByPage(HashMap map) {
        String hql = "from CangKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return cangKuDao.getPageList(hql, null, 1, 20);
    }

    @Override
    public List<KuWei> getCangKuKuWeiById(Integer id) {
        String hql = "from KuWei where ck_id="+id;
        return cangKuDao.getResult(hql, null);
    }

    @Override
    public boolean saveCangKuA01Kw(List<CangKuA01> a01s, List<KuWei> kws,Integer ck_id) {
        return cangKuDao.saveCangKuA01Kw(a01s, kws, ck_id);
    }

    @Override
    public List<A01> getCangKuA01ById(Integer id) {
        String hql = "from A01 where id in(select a01_id from CangKuA01 where ck_id="+id +")";
        return cangKuDao.getResult(hql, null);
    }

    @Override
    public boolean existCangKu(Integer qy_id, Integer id, String mc) {
        return cangKuDao.existCangKu(qy_id, id, mc);
    }
}
