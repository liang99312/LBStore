/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.CangKu;
import com.lb.lbstore.domain.CangKuA01;
import com.lb.lbstore.domain.KuWei;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface CangKuService {

    public CangKu getCangKuById(Integer id);
    
    public List<CangKu> getAllCangKus(Integer qy_id);
    
    public boolean existCangKu(Integer qy_id, Integer id, String mc);
    
    public boolean updateCangKu(CangKu cangKu);
    
    public CangKu saveCangKu(CangKu cangKu);
    
    public boolean deleteCangKu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<CangKu> queryCangKusByPage(HashMap map);

    public List<KuWei> getCangKuKuWeiById(Integer id);
    
    public boolean saveCangKuA01Kw(List<CangKuA01> a01s,List<KuWei> kws,Integer ck_id);
    
    public List<A01> getCangKuA01ById(Integer id);
}
